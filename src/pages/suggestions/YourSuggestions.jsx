import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

import { getUserID } from "../../helpers/getDataFromLocal.js";

import Creds from "../../components/dashboard/Creds.jsx";

import AddSuggestion from "../../components/dashboard/AddSuggestion.jsx";
import LatestSug from "../../components/dashboard/LatestSug.jsx";
import { HiOutlineDesktopComputer } from "react-icons/hi";

import Mini from "../../assets/user_icon.png";

// your suggestions component
import YourSuggestionsGrid from "../../components/dashboard/suggestions/YourSuggestionsGrid.jsx";

import { buildUrl } from "../../utils/buildUrl.js";

function YourSuggestions() {
	const userID = getUserID();
	const TOKEN = getToken();
	const [userDeets, setUserDeets] = useState({});
	const [isAdd, setIsAdd] = useState(false);
	const navigate = useNavigate();
	const date = new Date();

	const getUserDeets = async () => {
		try {
			await fetch(
				buildUrl(`/sug/user/${userID}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${TOKEN}`,
					},
				})
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setUserDeets(data.user);
				});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!getToken()) {
			return navigate("/login", { error: "Please login first to continue" });
		}

		getUserDeets();
	}, []);

	return (
		<div>
			<Creds />
			<LatestSug />
			<div className='mt-10 flex place-content-center lg:place-content-start'></div>
			{/* this will be a card to display number of suggestions of the user */}
			<div className='text-white shadow-2xl flex flex-col p-6 rounded-mt bg-gradient-to-tr from-black to-zinc-900 border border-zinc-300 rounded-xl mt-12 xxxs:w-full lg:w-3/12'>
				<div className='flex justify-between items-center'>
					<div className='flex gap-4 items-center'>
						<img
							src={Mini}
							alt={userDeets?.username}
							className='xxxxs:w-10 h-10'
						/>
						{userDeets?.username}
					</div>
					<h1 className='flex gap-4 items-center'>
						<HiOutlineDesktopComputer />
						{userDeets?.course}
					</h1>
				</div>
				<p className='text-zinc-600 font-thin mt-4'>Number of suggestions</p>
				<div className='flex gap-2 items-end'>
					<h1 className='font-extrabold xxxxs:text-9xl md:text-8xl lg:text-7xl'>
						{userDeets?.numberOfSuggestions}
					</h1>
					<p className='text-zinc-700 font-thin mt-4'>
						as of{" "}
						<span className='font-semibold'>
							{new Date(date).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</span>
					</p>
				</div>
				<button
					className='bg-gradient-to-tr from-orange-600 to-orange-500 px-4 py-4 mt-4 text-white font-semibold rounded-full w-full'
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
			{/* suggestions */}
			<div className='w-full mt-24'>
				<YourSuggestionsGrid />
			</div>
		</div>
	);
}

export default YourSuggestions;
