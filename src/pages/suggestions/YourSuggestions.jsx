import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

import { getUserID } from "../../helpers/getDataFromLocal.js";

import Creds from "../../components/dashboard/Creds.jsx";

import AddSuggestion from "../../components/dashboard/AddSuggestion.jsx";
import LatestSug from "../../components/dashboard/LatestSug.jsx";

// your suggestions component
import YourSuggestionsGrid from "../../components/dashboard/suggestions/YourSuggestionsGrid.jsx";

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
			<LatestSug />
			<div className='mt-10 flex place-content-center lg:place-content-start'>
				<button
					className='bg-white border-2 border-[#FF7800] px-4 py-2 text-primary font-semibold rounded-full'
					onClick={() => {
						setIsAdd(!isAdd);
					}}>
					Add Suggestion
				</button>
			</div>
			{/* this will be a card to display number of suggestions of the user */}
			<div className='flex flex-col p-4 rounded-md bg-primary mt-4 xxxs:w-full lg:w-3/12'></div>
			{isAdd && (
				<AddSuggestion
					isAdd={isAdd}
					setIsAdd={setIsAdd}
					userID={userID}
				/>
			)}
			{/* suggestions */}
			<div className='w-full mt-24'>
				<YourSuggestionsGrid />
			</div>
		</div>
	);
}

export default YourSuggestions;
