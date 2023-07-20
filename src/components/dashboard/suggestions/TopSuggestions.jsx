import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { buildUrl } from "../../../utils/buildUrl";
import { getToken } from "../../../helpers/getToken";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { MdPageview } from "react-icons/md";
import { BiSolidUserRectangle } from "react-icons/bi";
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";
import { FaComments } from "react-icons/fa";

function TopSuggestions() {
	const TOKEN = getToken();
	const [topSug, setTopSug] = useState([]);
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const getTopSug = async () => {
		setIsLoading(true);
		try {
			await fetch(buildUrl("/sug/top-suggestions"), {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${TOKEN}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setTopSug(data.topSuggestions);
					setUsername(data.username);
					setTimeout(() => {
						setIsLoading(false);
					}, 1500);
				});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTopSug();
	}, []);
	return (
		<div className=''>
			<h1 className='font-bold text-4xl mb-8 xxxxs:mt-10 md:mt-32'>
				Top 3 Suggestions
			</h1>
			<div className='bg-primary p-4 rounded-md w-full xxxs:flex flex-col gap-10 xl:grid grid-cols-2 xxl:grid grid-cols-3'>
				{topSug.length !== 0 ? (
					topSug.map((suggestion) => (
						<div
							key={suggestion?._id}
							className='bg-white rounded-md shadow-md xxxxs:p-2 md:p-4'>
							<div className='flex justify-between mb-4'>
								<div className='flex gap-4 items-center mb-2'>
									<BiSolidUserRectangle size={30} />
									<h1>{username}</h1>
								</div>
								<Link to={`/suggestion/${suggestion?._id}`}>
									<MdPageview
										size={40}
										className='bg-white text-primary border border-[#FF7800] rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white hover:
										window.location.reload();  duration-200'
									/>
								</Link>
							</div>
							<div className='flex gap-4 items-center bg-zinc-200 px-4 py-2 rounded-md '>
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
								<h1 className='font-bold mb-6 xxxs:text-xl md:text-2xl lg:text-3xl'>
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
									<button className='hover:text-primary duration-200'>
										<TbSquareRoundedArrowUpFilled size={30} />
									</button>
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
					))
				) : (
					<h1>No Suggestions Yet</h1>
				)}
			</div>
		</div>
	);
}

export default TopSuggestions;
