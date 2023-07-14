import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

import { getUserID } from "../../helpers/getDataFromLocal.js";

import Creds from "../../components/dashboard/Creds.jsx";

import AddSuggestion from "../../components/dashboard/AddSuggestion.jsx";
import Timer from "../../components/dashboard/Timer.jsx";

function YourSuggestions() {
	const userID = getUserID();
	const [isAdd, setIsAdd] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!getToken()) {
			return navigate("/login", { error: "Please login first to continue" });
		}
	}, []);

	return (
		<div>
			<Creds />
			<Timer />
			<div className=''>
				<button
					onClick={() => {
						setIsAdd(!isAdd);
					}}>
					Add Suggestion
				</button>
			</div>
			{isAdd && (
				<AddSuggestion
					isAdd={isAdd}
					setIsAdd={setIsAdd}
					userID={userID}
				/>
			)}
		</div>
	);
}

export default YourSuggestions;
