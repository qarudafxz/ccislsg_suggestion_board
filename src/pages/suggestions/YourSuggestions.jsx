import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

import Creds from "../../components/dashboard/Creds.jsx";

function YourSuggestions() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!getToken()) {
			return navigate("/login", { error: "Please login first to continue" });
		}
	}, []);

	return (
		<div className='xxxxs:flex flex-col p-4 relative top-12 md:flex-row justify-between'>
			<button>Add Suggestion</button>
			<Creds />
		</div>
	);
}

export default YourSuggestions;
