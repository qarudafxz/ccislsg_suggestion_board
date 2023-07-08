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

		console.log(suggestionToday);

		//if there will be a suggestion being returned from the database, it means that the user has already suggested today
		suggestionToday ? (user.canSuggest = false) : (user.canSuggest = true);

		console.log(user.canSuggest);

		if (!user.canSuggest) {
			return res
				.status(400)
				.json({ message: "You can only suggest once a day. Comeback tomorrow!" });
		}

		user.numberOfSuggestions += 1;

		const newSuggestion = new Sug({ creatorID: user._id, subject, suggestion });

		await newSuggestion.save();
		await user.save();

		return res.status(201).json({
			newSuggestion,
			message: "Suggestion added successfully",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};
