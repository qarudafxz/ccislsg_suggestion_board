import React, { useState, useEffect } from "react";

import { buildUrl } from "../utils/buildUrl.js";

import { PiUserSquareDuotone } from "react-icons/pi";

import { getUserID } from "../helpers/getDataFromLocal.js";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TopUsers() {
	const userID = getUserID();
	const [topUsers, setTopUsers] = useState([]);

	const fetchTopUsers = async () => {
		try {
			await fetch(buildUrl("/sug/top-5"), {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setTopUsers(data.top5);
				});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchTopUsers();
	}, []);
	return (
		<div className='mt-36 bg-gradient-to-tr from-black to-zinc-900 p-4 rounded-md w-full'>
			<h1 className='flex gap-4 items-center place-content-center font-bold mb-8 text-white xxxxs:text-2xl lg:text-4xl'>
				<PiUserSquareDuotone />
				Top <span className='text-primary'>10</span>{" "}
				<span className='text-zinc-600'>Users</span>
			</h1>
			<p className='text-zinc-600 xxxxs:font-thin text-xs lg:text-lg font-main'>
				Ranking is based on the total number of suggestions
			</p>
			{topUsers && (
				<div className='flex flex-col gap-4 mt-4'>
					<div className='text-white flex justify-between pb-2 border-b border-zinc-600'>
						<h1>Username</h1>
						<h1>Suggestions</h1>
					</div>
					{topUsers.map((user, idx) => (
						<div
							key={user._id}
							className={`p-2 flex justify-between text-white ${
								idx === 0
									? "bg-zinc-800 rounded-md changeColor"
									: idx === 1
									? "bg-zinc-900"
									: ""
							} xxxxs:font-semibold`}>
							<h1>
								<span className='font-thin'>{idx + 1}.</span> {user.username}{" "}
								{user._id === userID && "(You)"}
							</h1>
							<p>{user?.numberOfSuggestions}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default TopUsers;
