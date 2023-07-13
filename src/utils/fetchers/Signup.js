import { buildUrl } from "../buildUrl.js";

export const authSignup = async (username, email, password) => {
	const URL = buildUrl(`/auth/signup`);

	return await fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, email, password }),
	});
};
