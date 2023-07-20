import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdPageview } from "react-icons/md";
import { BiSolidUserRectangle } from "react-icons/bi";
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";
import { FaComments } from "react-icons/fa";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { allSuggestions } from "../../../utils/fetchers/AllSuggestions.js";

function AllSuggestion() {
	const [suggestions, setSuggestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const pageSize = 3;
	const [currentPage, setCurrentPage] = useState(1); // Changed to start from 1

	const totalSuggestions = suggestions?.length || 0; // Added a default value of 0
	const totalPages = Math.ceil(totalSuggestions / pageSize);
	const startIdx = (currentPage - 1) * pageSize;
	const endIdx = startIdx + pageSize;
	const currentSug = suggestions?.slice(startIdx, endIdx);

	const fetchSuggestions = async () => {
		setIsLoading(true);
		try {
			allSuggestions()
				.then((res) => res.json())
				.then((data) => {
					setSuggestions(data.suggestions);
					setTimeout(() => {
						setIsLoading(false);
					}, 1500);
				});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchSuggestions();
	}, []);

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected + 1); // Need to add 1 to selected as we start from 1
	};

	return (
		<div className='mt-10'>
			<h1 className='font-bold text-4xl mb-8'>All Suggestions</h1>
			<div className='xxxs:flex flex-col gap-10 xl:grid grid-cols-2 xxl:grid grid-cols-3'>
				{currentSug &&
					currentSug.map((suggestion) => {
						return (
							<div
								key={suggestion?._id}
								className='bg-white border border-zinc-300 rounded-md shadow-lg xxxxs:p-2 md:p-4'>
								<div className='flex justify-between mb-4'>
									<div className='flex gap-4 items-center mb-2'>
										<BiSolidUserRectangle size={30} />
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
						);
					})}
			</div>

			{totalPages > 1 && (
				<div className='mt-20 mb-10 flex justify-center'>
					<ul className='flex items-center bg-white'>
						{Array.from({ length: totalPages }, (_, index) => index + 1).map(
							(page) => (
								<li
									key={page}
									className={`border border-zinc-400  ${
										page === currentPage
											? "font-bold bg-gradient-to-tr from-orange-900 to-orange-600 text-white py-2 px-4"
											: "hover:bg-[#D5D5D5] duration-150 py-2 px-4 cursor-pointer"
									}`}
									onClick={() => handlePageChange({ selected: page - 1 })} // Subtract 1 to get the correct selected value
								>
									{page}
								</li>
							)
						)}
					</ul>
				</div>
			)}
		</div>
	);
}

export default AllSuggestion;
