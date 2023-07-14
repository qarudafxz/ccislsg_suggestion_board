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
		<div>
			<Creds />
			<div className=''>
				<button>Add Suggestion</button>
			</div>
		</div>
	);
}

export default YourSuggestions;
