import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BiSolidUserRectangle } from "react-icons/bi";
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";

import { getUserID } from "../../../helpers/getDataFromLocal.js";
import { getToken } from "../../../helpers/getToken.js";

import { FaTrashCan, FaComments } from "react-icons/fa6";

import { getAllOfYourSuggestions } from "../../../utils/fetchers/GetAllSuggestions.js";

function YourSuggestions() {
	const TOKEN = getToken();
	const userID = getUserID();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchAllOfYourSuggestions = async () => {
		setIsLoading(true);
		try {
			getAllOfYourSuggestions(userID, TOKEN)
				.then((res) => res.json())
				.then((data) => {
					setData(data);
					console.log(data);
					setTimeout(() => {
						setIsLoading(false);
					}, 1500);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const deleteSuggestion = async (userID, sugID) => {
		const URL = import.meta.env.DEV ? `http://localhost:3002/api` : `/api`;

		console.log(URL + `/sug/delete-suggestion/${userID}/${sugID}`);
		try {
			await fetch(URL + `/sug/delete-suggestion/${userID}/${sugID}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${TOKEN}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					fetchAllOfYourSuggestions();
				});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		document.title = "Your Suggestions | CCISLSG Suggestion Board";
		fetchAllOfYourSuggestions();
	}, []);

	return (
		<div
			className='mb-10 xxxs:flex flex-col gap-10 xl:grid grid-cols-2 xxl:grid-cols-3'
			style={{ maxHeight: "2000px" }}>
			{data?.yourSuggestions ? (
				data?.yourSuggestions?.map((suggestion) => {
					return (
						<div
							key={suggestion?._id}
							className='w-full border border-zinc-300 rounded-md shadow-md xxxxs:p-2 md:p-4'>
							<div className='flex justify-between mb-4'>
								<div className='flex gap-4 items-center mb-2'>
									<BiSolidUserRectangle size={30} />
									<h1 className='font-semibolf'>{data?.user?.username}</h1>
								</div>
								<button onClick={() => deleteSuggestion(userID, suggestion?._id)}>
									<FaTrashCan
										size={40}
										className='bg-white text-primary border border-[#FF7800] rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white hover:
										window.location.reload();  duration-200'
									/>
								</button>
							</div>
							<div className='flex gap-4 items-center bg-primary px-4 py-2 rounded-md text-white'>
								<h1 className='font-bold xxxs:text-lg md:text-xl lg:text-2xl'>
									Subject:{" "}
								</h1>
								<h1>
									{suggestion?.subject ? (
										suggestion?.subject
									) : (
										<Skeleton
											baseColor='#D1D1D1'
											highlightColor='#E8E8E8'
										/>
									)}
								</h1>
							</div>
							<div className='flex flex-col gap-2 mt-6'>
								<h1 className='font-bold mb-4 xxxs:text-xl md:text-2xl lg:text-3xl'>
									Suggestion
								</h1>
								<p className='xxxxs:text-md md:text-sm xl:text-md'>
									{!isLoading ? (
										suggestion?.suggestion
									) : (
										<Skeleton
											baseColor='#D1D1D1'
											highlightColor='#E8E8E8'
										/>
									)}
								</p>
							</div>
							<div className='border border-zinc-200 mt-4 rounded-md px-4 py-2 xxxxs:flex flex-col gap-4 lg:grid grid-cols-3'>
								<div className='flex flex-col gap-2 xxxs:text-sm lg:text-xs'>
									<h1>Date Suggested: </h1>
									<h1>
										{!isLoading ? (
											new Date(suggestion?.createdAt).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
												hour: "numeric",
												minute: "numeric",
												second: "numeric",
											})
										) : (
											<Skeleton
												baseColor='#D1D1D1'
												highlightColor='#E8E8E8'
											/>
										)}
									</h1>
								</div>
								<div className='flex gap-2 items-center'>
									<TbSquareRoundedArrowUpFilled size={30} />
									<h1>
										{!isLoading ? (
											suggestion?.upVotes
										) : (
											<Skeleton
												baseColor='#D1D1D1'
												highlightColor='#E8E8E8'
											/>
										)}
									</h1>
								</div>
								<div className='flex gap-2 items-center'>
									<FaComments size={30} />
									<h1>
										{!isLoading ? (
											suggestion?.numberOfComments
										) : (
											<Skeleton
												baseColor='#D1D1D1'
												highlightColor='#E8E8E8'
											/>
										)}
									</h1>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<h1 className='font-bold text-center text-primary xxxs:text-xl lg:text-5xl'>
					No Suggestions
				</h1>
			)}
		</div>
	);
}

export default YourSuggestions;
