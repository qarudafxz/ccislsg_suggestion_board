import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import { getToken } from "../helpers/getToken.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authSignup } from "../utils/fetchers/Signup.js";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import Logo from "../assets/logo.png";
function Signup() {
	const TOKEN = getToken();
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);
	const [course, setCourse] = useState("");

	const usernameRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const courses = ["BSIT", "BSCS", "BSIS"];

	const successful = async (res) => {
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
		setTimeout(() => {
			navigate("/login");
		}, 1500);
		return;
	};

	const unsuccessful = async (res) => {
		setProgress(80);
		const data = await res.json();
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
		setProgress(100);
		return;
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		const username = usernameRef?.current?.value;
		const email = emailInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;

		setProgress(30);
		if (!username || !email || !password || !course) {
			toast.error("Input all fields", {
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
		try {
			authSignup(username, email, password, course).then((res) => {
				switch (res.status) {
					case 200:
						successful(res);
						break;
					case 400:
						unsuccessful(res);
						break;
					default:
						break;
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (TOKEN) {
			setProgress(30);
			setTimeout(() => {
				setProgress(100);
			}, 1000);
			setTimeout(() => {
				navigate("/all");
			}, 1500);
		}
	}, [TOKEN]);

	useEffect(() => {
		usernameRef.current.focus();
		document.title = "Signup | CCISLSG Suggestion Board";
	}, []);

	return (
		<div className='font-main'>
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
			<div className='xxxxs:flex flex-col gap-4 md:w-full h-screen grid place-items-center'>
				<form className='xxxxs:mt-8 lg:mt-20 xl:mt-32 px-8 xs:w-full md:w-10/12 lg:w-4/12'>
					<img
						src={Logo}
						alt='CCISLSG Logo'
						className='xxxxs:w-24 h-24 m-auto'
					/>
					<h1 className='font-semibold text-center text-primary'>
						CCISLSG Suggestion Board
					</h1>
					<h1 className='font-bold  text-center my-4 xxxxs:text-4xl md:text-5xl lg:text-6xl'>
						Sign up
					</h1>
					<div className='flex flex-col mt-4'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							ref={usernameRef}
							className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>
					<div className='flex flex-col mt-4'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							ref={emailInputRef}
							className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>
					<div className='flex flex-col mt-4'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
							ref={passwordInputRef}
						/>
					</div>
					<div className='flex flex-col mt-4'>
						<label htmlFor='course'>Course</label>
						<Dropdown
							className='w-full mt-4 rounded-md text-primary focus:outline-none'
							options={courses}
							onChange={(courses) => setCourse(courses?.value)}
							placeholder='Select Course'
						/>
					</div>

					<button
						onClick={handleSignup}
						className='w-full bg-primary py-2 text-center text-white font-semibold rounded-md mt-4'>
						Sign Up
					</button>
					<p className='mt-4 text-zinc-400 xxxxs:text-base md:flex place-content-center'>
						Already have an account?{" "}
						<span className='underline text-primary ml-2'>
							<Link to='/login'>Log In</Link>
						</span>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Signup;
