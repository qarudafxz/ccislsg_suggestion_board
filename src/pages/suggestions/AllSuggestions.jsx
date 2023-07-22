import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

//components
import TopSuggestions from "../../components/dashboard/suggestions/TopSuggestions.jsx";

import Creds from "../../components/dashboard/Creds.jsx";

import AllSuggestion from "../../components/dashboard/suggestions/AllSuggestion.jsx";
import TopUsers from "../../components/TopUsers.jsx";

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
			<div>
				<div className='xxxxs:flex flex-col-reverse gap-14 lg:flex-row'>
					<TopSuggestions />
					{/* all suggestions' pagination */}
					<TopUsers />
				</div>
				<AllSuggestion />
			</div>
		</div>
	);
}

export default AllSuggestions;
