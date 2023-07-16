import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

//components

import Creds from "../../components/dashboard/Creds.jsx";

function AllSuggestions() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!getToken()) {
			return navigate("/login", { error: "Please login first to continue" });
		}
		document.title = "All Suggestions | CCISLSG Suggestion Board";
	}, []);

	return (
		<div>
			<Creds />
		</div>
	);
}

export default AllSuggestions;
