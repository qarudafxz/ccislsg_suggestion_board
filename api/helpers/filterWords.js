import { filter as SWEAR } from "../utils/filter.js";

export const filterWords = (suggestion) => {
	const hasSwearWord = SWEAR.some((word) => suggestion.includes(word));
	//console log the value of the swear word, not the hasSwearWord to identify	the swear word
	console.log(SWEAR.filter((word) => suggestion.includes(word)));
	// returns true if hasSwearWord is true means that the suggestion includes some swear words
	return hasSwearWord;
};
