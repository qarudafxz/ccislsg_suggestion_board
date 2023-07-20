import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

//components
import TopSuggestions from "../../components/dashboard/suggestions/TopSuggestions.jsx";

import Creds from "../../components/dashboard/Creds.jsx";

import AllSuggestion from "../../components/dashboard/suggestions/AllSuggestion.jsx";

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
			<TopSuggestions />
			{/* all suggestions' pagination */}
			<AllSuggestion />
		</div>
	);
}

export default AllSuggestions;
