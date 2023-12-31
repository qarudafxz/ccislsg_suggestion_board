import { Sug } from "../models/Sug.js";
import { User } from "../models/User.js";
import { Comments } from "../models/Comments.js";
import { filterWords } from "../helpers/filterWords.js";

export const addSuggestion = async (req, res) => {
	const { id } = req.params;
	const { subject, suggestion } = req.body;
	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		if (!suggestion) {
			return res.status(400).json({ message: "Please enter a suggestion" });
		}

		const suggestionToLower = suggestion.toLowerCase();

		if (filterWords(suggestionToLower)) {
			return res.status(400).json({ message: "Please do not use swear words" });
		}

		const today = new Date();
		const suggestionToday = await Sug.findOne({
			creatorID: user._id,
			createdAt: {
				$gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
				$lte: new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate(),
					23,
					59,
					59
				),
			},
		});

		//if there will be a suggestion being returned from the database, it means that the user has already suggested today
		suggestionToday ? (user.canSuggest = false) : (user.canSuggest = true);

		if (!user.canSuggest) {
			return res.status(400).json({
				user,
				message: "You can only suggest once a day. Comeback tomorrow!",
			});

			//if the user has not been able to suggest today, the user will be able to suggest again after 24 hours
		} else {
			user.numberOfSuggestions += 1;

			const newSuggestion = new Sug({
				creatorID: user._id,
				creatorName: user.username,
				subject,
				suggestion,
			});

			await newSuggestion.save();
			await user.save();

			return res.status(200).json({
				newSuggestion,
				user,
				message: "Suggestion added successfully",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

export const editSuggestion = async (req, res) => {
	const { sugID } = req.params;
	const { subject, suggestion } = req.body;

	try {
		const sug = await Sug.findOneAndUpdate({ _id: sugID });

		if (!sug) {
			return res.status(400).json({ message: "Suggestion does not exist" });
		}

		if (!suggestion) {
			return res.status(400).json({ message: "Suggestion cannot be empty" });
		}

		const suggestionToLower = suggestion.toLowerCase();

		if (filterWords(suggestionToLower)) {
			return res.status(400).json({ message: "Please do not use swear words" });
		}

		sug.subject = subject;
		sug.suggestion = suggestion;

		await sug.save();
		return res.status(200).json({ message: "Suggestion edited successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

//delete suggestion
export const deleteSuggestion = async (req, res) => {
	const { userID, sugID } = req.params;

	try {
		const user = await User.findOne({ _id: userID });

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const sug = await Sug.findOneAndDelete({ _id: sugID, creatorID: userID });

		if (!sug) {
			return res.status(400).json({ message: "Suggestion does not exist" });
		}

		console.log(user);

		user.numberOfSuggestions -= 1;

		await user.save();

		console.log(user.numberOfSuggestions);

		return res.status(200).json({ message: "Suggestion deleted successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

//get all suggestions

export const getAllSuggestions = async (req, res) => {
	try {
		const suggestions = await Sug.find();

		if (!suggestions) {
			return res.status(400).json({ message: "No suggestions found" });
		}

		return res.status(200).json({ suggestions, message: "Suggestions found" });
	} catch (err) {
		console.log(err);
	}
};

//get top suggestions
export const getTopSuggestions = async (req, res) => {
	try {
		const suggestions = await Sug.find();

		if (!suggestions) {
			return res.status(400).json({ message: "No suggestions found" });
		}

		const user = await User.find({ _id: suggestions.creatorID });

		const topSuggestions = suggestions
			.sort((a, b) => b.upVotes - a.upVotes)
			.slice(0, 4);

		console.log(user);

		return res
			.status(200)
			.json({ topSuggestions, user, message: "Top 3 Suggestions found" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

//get latest suggestion from user
export const getLatestSug = async (req, res) => {
	const { userID } = req.query;

	try {
		const user = await User.findOne({ _id: userID });

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const latestSug = await Sug.findOne({ creatorID: userID }).sort({
			createdAt: -1,
		});

		if (!latestSug) {
			return res.status(400).json({ message: "No suggestions found" });
		}

		return res
			.status(200)
			.json({ latestSug, message: "Latest suggestion found" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

//get your suggestions
export const getYourSuggestions = async (req, res) => {
	const { userID } = req.query;
	try {
		const user = await User.findOne({ _id: userID });

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const yourSuggestions = await Sug.find({ creatorID: userID });

		if (!yourSuggestions) {
			return res.status(400).json({ message: "No suggestions found" });
		}

		return res.status(200).json({ user, yourSuggestions });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

//add comment to a specific suggestion

export const addComment = async (req, res) => {
	const { creatorID, sugID } = req.params;
	const { comment } = req.body;

	try {
		// const user = await User.findOne({ _id: req.params.creatorID });

		// if (!user) {
		// 	return res.status(400).json({ message: "User does not exist" });
		// }

		const sug = await Sug.findOne({ _id: sugID });

		if (!sug) {
			return res.status(400).json({ message: "Suggestion does not exist" });
		}

		sug.numberOfComments += 1;

		const commentToLower = comment.toLowerCase();

		if (filterWords(commentToLower)) {
			return res.status(400).json({ message: "Please do not use swear words" });
		}

		const newComment = new Comments({
			creatorID,
			suggestionID: sugID,
			// creatorName: user.username,
			comment,
		});

		await sug.save();
		await newComment.save();

		return res.status(200).json({ message: "Comment successfully added" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

//get user details

export const getUserDetails = async (req, res) => {
	try {
		console.log(req.params.id);
		const user = await User.findOne({ _id: req.params.id });
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		return res.status(200).json({ user });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server error" });
	}
};

// top users counted by the number of suggestions

export const topUsers = async (req, res) => {
	try {
		const user = await User.find({});

		if (!user) {
			return res.status(400).json({ message: "No single user found" });
		}

		const top5 = user
			.sort((a, b) => b.numberOfSuggestions - a.numberOfSuggestions)
			.splice(0, 10);

		return res
			.status(200)
			.json({ top5, message: "Top 5 users fetched successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server error" });
	}
};

export const getOneSugBasedOnId = async (req, res) => {
	const { id } = req.params;

	try {
		const suggestion = await Sug.findOne({ _id: id });

		if (!suggestion) {
			return res.status(400).json({ message: "Suggestion does not exist" });
		}

		const comments = await Comments.find({ suggestionID: id });

		if (!comments) {
			return res.status(400).json({ message: "No comments found" });
		}

		return res
			.status(200)
			.json({ suggestion, comments, message: "Suggestion found" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};

export const castUpvote = async (req, res) => {
	const { id } = req.params;
	try {
		//add +1 to the upvotes
		const suggestion = await Sug.findOneAndUpdate(
			{ _id: id },
			{ $inc: { upVotes: 1 } },
			{ new: true }
		);

		if (!suggestion) {
			return res.status(400).json({ message: "Suggestion does not exist" });
		}

		return res.status(200).json({ suggestion, message: "Upvote casted" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};
