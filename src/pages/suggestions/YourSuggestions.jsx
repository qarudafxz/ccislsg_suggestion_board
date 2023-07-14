import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

import { getUserID } from "../../helpers/getDataFromLocal.js";

import Creds from "../../components/dashboard/Creds.jsx";

import AddSuggestion from "../../components/dashboard/AddSuggestion.jsx";
import Timer from "../../components/dashboard/Timer.jsx";

function YourSuggestions() {
	const monthNow = new Date().toLocaleString("en-US", { month: "long" });
	const yearNow = new Date().getFullYear();
	const date = localStorage.getItem("date");
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
			<div className='bg-red-500'>
				<h1>{`Last Suggestion Created: ${new Date(date).toLocaleDateString(
					"en-US",
					{
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						hour12: true,
						month: "long",
						day: "numeric",
						year: "numeric",
					}
				)}`}</h1>

				<h1>{`New Suggestion will be on ${monthNow} ${
					new Date().getDate() + 1
				}, ${yearNow}`}</h1>
				<div className='flex gap-2'>
					<h1>
						Date & Time Now:{" "}
						{new Date().toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</h1>
					<Timer />
				</div>
			</div>
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
