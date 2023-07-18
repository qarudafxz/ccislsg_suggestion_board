import { buildUrl } from "../buildUrl.js";

export const getAllOfYourSuggestions = async (userID, TOKEN) => {
	const URL = buildUrl(`/sug/your-suggestions/?userID=${userID}`);

	return await fetch(URL, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			"Content-Type": "application/json",
		},
	});
};
