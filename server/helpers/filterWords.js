import { filter as SWEAR } from "../utils/filter.js";

export const filterWords = (suggestion) => {
	const hasSwearWord = SWEAR.some((word) => suggestion.includes(word));
	// returns true if hasSwearWord is true means that the suggestion includes some swear words
	return hasSwearWord;
};
