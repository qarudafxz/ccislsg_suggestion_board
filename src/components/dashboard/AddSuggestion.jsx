import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopLoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addSuggestion } from "../../utils/fetchers/AddSuggestion.js";

import { AiFillCloseCircle } from "react-icons/ai";

const maximumText = 255;

function AddSuggestion({ ...props }) {
	const [subject, setSubject] = useState("");
	const suggestionRef = useRef();
	const [progress, setProgress] = useState(0);
	const [textCount, setTextCounter] = useState(maximumText);

	const checkMaximumText = () => {
		const currentTextCount = maximumText - suggestionRef.current.value.length;
		setTextCounter(Math.max(currentTextCount));
	};

	const success = async (res) => {
		setProgress(80);
		const data = await res.json();
		toast.success(data.message, {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		localStorage.setItem("date", data?.newSuggestion?.createdAt);
		props.setIsAdd(!props.isAdd);
		setProgress(100);
		return;
	};

	const unsuccessful = async (res) => {
		setProgress(80);
		const data = await res.json();

		const storedDate = localStorage.getItem("date");
		const newSuggestionDate = new Date(storedDate);
		newSuggestionDate.setDate(newSuggestionDate.getDate() + 1);

		const formattedDate = newSuggestionDate.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: true,
		});

		const toastOptions = {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		};

		toast.error(
			`${data.message}. You can re-suggest on ${formattedDate}`,
			toastOptions
		);

		setProgress(100);
	};

	const submitSuggest = async (e) => {
		e.preventDefault();
		setProgress(30);

		const suggestion = suggestionRef.current.value;

		if (!subject || !suggestion) {
			setProgress(100);
			toast.error("Please fill all the fields", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setProgress(100);
			return;
		}

		if (textCount <= 0) {
			setProgress(100);
			toast.error("Maximum text exceeded", {
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

		try {
			addSuggestion(props.userID, subject, suggestion).then((res) => {
				switch (res.status) {
					case 200:
						success(res);
						break;

					case 400:
						unsuccessful(res);
						break;
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
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
			<AnimatePresence>
				{props.isAdd && (
					<div
						className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
							blur ? "backdrop-blur-lg" : ""
						}`}>
						<motion.form
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.8,
								delay: 0.5,
								ease: [0, 0.71, 0.2, 1.01],
							}}
							className='flex flex-col gap-4 p-10 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl xxxxs:w-10/12 md:w-7/12 lg:w-5/12'>
							<div className='flex justify-end items-center gap-4'>
								<button
									className='text-primary'
									onClick={() => props.setIsAdd(!props.isAdd)}>
									<AiFillCloseCircle size={40} />
								</button>
							</div>
							<div className='flex flex-col justify-between gap-6'>
								<label htmlFor={subject}>Subject</label>
								<input
									type='text'
									className='py-2 pl-4 rounded-md border border-zinc-400'
									onChange={(e) => setSubject(e.target.value)}
								/>
								<label htmlFor={suggestionRef}>Suggestion</label>
								<textarea
									type='text'
									className='py-2 pl-4 rounded-md border border-zinc-400 h-96'
									ref={suggestionRef}
									onInput={() => checkMaximumText()}
								/>
								<p
									className={`flex justify-end font-semibold w-12 ${
										textCount <= 0
											? "text-red-500 border-2 border-red-500 rounded-full py-3 px-3"
											: textCount <= 40
											? "text-yellow-500"
											: "text-green-500"
									}`}>
									{textCount}
								</p>
							</div>
							<button
								type='button'
								onClick={(e) => {
									submitSuggest(e);
								}}
								className='bg-primary text-white py-2 px-4 rounded-md flex justify-center'>
								Add Suggestion
							</button>
						</motion.form>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default AddSuggestion;
