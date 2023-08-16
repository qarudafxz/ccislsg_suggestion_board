import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { buildUrl } from "../../utils/buildUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopLoadingBar from "react-top-loading-bar";

import {
	getUserID,
	getUsernameAndEmail,
} from "../../helpers/getDataFromLocal.js";

import TopUsers from "../../components/TopUsers";
import { getToken } from "../../helpers/getToken";

import { GrSend } from "react-icons/gr";

function ViewSuggestion() {
	const TOKEN = getToken();
	const { id } = useParams();
	const userID = getUserID();
	const [suggestion, setSuggestion] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [username, setUsername] = useState(null);
	const [comment, setComment] = useState("");
	const suggestionID = useRef(null);
	const [comments, setComments] = useState([]);
	const usernameCur = useRef(username);
	const commentCur = useRef(comment);

	const successful = () => {
		setProgress(80);
		toast.success("Added a comment", {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		setComments(() => [...comments, { usernameCur, comment }]);
		setComment("");
		return;
	};

	const failed = (data) => {
		setProgress(80);
		toast.error(data.message, {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		return;
	};

	const getSuggestion = async () => {
		setIsLoading(true);
		try {
			await fetch(
				buildUrl(`/sug/get-suggest/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${TOKEN}`,
					},
				})
			)
				.then((res) => res.json())
				.then((data) => {
					setSuggestion(data.suggestion);
					suggestionID.current = data.suggestion._id;
					setComments(data.comments);

					setTimeout(() => {
						setIsLoading(false);
					}, 1500);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const postComment = async (e, creatorID, id) => {
		e.preventDefault();
		setProgress(30);

		if (!comment) {
			setProgress(100);
			toast.error("Please added a comment", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;
		}

		const END_POINT = import.meta.env.DEV
			? `http://localhost:3002/api/sug/add-comment/${creatorID}/${id}`
			: `/api/sug/add-comment/${creatorID}/${id}`;

		try {
			await fetch(END_POINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${TOKEN}`,
				},
				body: JSON.stringify({
					creatorID,
					sugID: id,
					comment,
				}),
			}).then(async (res) => {
				switch (res.status) {
					case 200:
						successful();
						break;

					case 400:
						const data = await res.json();
						failed(data);
						break;
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getSuggestion();
		const { username } = getUsernameAndEmail();
		setUsername(username);
	}, []);

	return (
		<div className='mb-20 xxxxs:flex flex-col-reverse gap-8 md:flex-row'>
			{/* Suggestion div */}
			<TopLoadingBar
				color='#FF7800'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={7}
			/>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<div>
				<div className='bg-white border border-zinc-300 rounded-md shadow-lg xxxxs:p-2 md:p-4'>
					<div className='xxxxs:flex flex-col'>
						<h1 className='xxxxs:font-sm font-semibold'>{suggestion?.creatorName}</h1>
						<h1 className='text-zinc-400 bg-zinc-200 p-1 rounded-md border-2 border-zinc-300'>
							{new Date(suggestion?.createdAt).toLocaleString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
								second: "numeric",
							})}
						</h1>
					</div>
					<h1 className='xxxxs:text-xl font-bold mt-4'>{suggestion?.subject}</h1>
					<p className='xxxxs:text-xs mt-4'>{suggestion?.suggestion}</p>
					<p className='text-zinc-400 xxxxs:text-xs mt-4 text-right'>
						{suggestion?.numberOfComments}{" "}
						{suggestion?.numberOfComments <= 1 ? "comment" : "comments"}
					</p>
				</div>
				{/* Comments */}
				<div className=''>
					{comments.length > 0 ? (
						comments?.map((comment, idx) => {
							return (
								<div
									key={idx}
									className='flex flex-col'>
									<div className='flex gap-2'>
										<h1 className='font-semibold'>{comment?.username}</h1>
										<h1 className='text-zinc-400'>
											{!comment?.createdAt
												? new Date().toLocaleString("en-US", {
														month: "long",
														day: "numeric",
														year: "numeric",
														hour: "numeric",
														minute: "numeric",
														second: "numeric",
												  })
												: new Date(comment.createdAt).toLocaleString("en-US", {
														month: "long",
														day: "numeric",
														year: "numeric",
														hour: "numeric",
														minute: "numeric",
														second: "numeric",
												  })}
										</h1>
										<h1>{comment?.comment}</h1>
									</div>
								</div>
							);
						})
					) : (
						<h1>No comments</h1>
					)}
					<div className='flex items-center w-full'>
						<input
							type='text'
							placeholder='Add comment'
							className='p-2 border border-zinc-300 w-full rounded-md xxxxs:text-sm md:text-lg'
							onChange={(e) => setComment(e.target.value)}
						/>
						<button onClick={(e) => postComment(e, userID, suggestionID.current)}>
							<GrSend
								size={40}
								className='bg-primary text-white rounded-md p-2 cursor-pointer'
							/>
						</button>
					</div>
				</div>
			</div>
			<TopUsers />
		</div>
	);
}

export default ViewSuggestion;
