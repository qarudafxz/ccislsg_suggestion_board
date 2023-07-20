import { buildUrl } from "../buildUrl.js";

export const allSuggestions = async () => {
	const URL = buildUrl("/sug/all");

	return await fetch(URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
