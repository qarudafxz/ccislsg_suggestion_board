import { buildUrl } from "../buildUrl.js";

export const authLogin = async (email, password) => {
	const URL = buildUrl("/auth/login");

	return await fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
};
