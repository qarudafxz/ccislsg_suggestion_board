import { Sug } from "../models/Sug.js";
import { User } from "../models/User.js";
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

			const newSuggestion = new Sug({ creatorID: user._id, subject, suggestion });

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
export const deleteSuggestion = async (req, res) => {};

//get top suggestions
export const getTopSuggestions = async (req, res) => {
	try {
		const suggestions = await Sug.find();

		if (!suggestions) {
			return res.status(400).json({ message: "No suggestions found" });
		}

		const topSuggestions = suggestions
			.sort((a, b) => b.upVotes - a.upVotes)
			.slice(0, 5);

		return res
			.status(200)
			.json({ topSuggestions, message: "Top 5 Suggestions found" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};
