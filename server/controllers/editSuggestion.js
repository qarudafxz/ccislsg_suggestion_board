import { Sug } from "../models/Sug.js";
import { filterWords } from "../helpers/filterWords.js";

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
