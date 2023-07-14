import { buildUrl } from "../buildUrl.js";
import { getToken } from "../../helpers/getToken.js";

export const addSuggestion = async (userID, subject, suggestion) => {
	const TOKEN = getToken();
	const URL = buildUrl(`/sug/suggest/${userID}`);

	return await fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${TOKEN}`,
		},
		body: JSON.stringify({ subject, suggestion }),
	});
};
