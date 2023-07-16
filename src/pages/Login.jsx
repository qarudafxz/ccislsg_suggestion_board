import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import logo from "../assets/logo.png";
import LoginBg from "../assets/login-bg.jpg";

import TopLoadingBar from "react-top-loading-bar";

import { authLogin } from "../utils/fetchers/Login.js";

import { getToken } from "../helpers/getToken.js";

function Login() {
	const TOKEN = getToken();
	const { error } = useParams();
	const [message, setMessage] = useState(error || undefined);
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);
	const [incorrectEmail, setIncorrectEmail] = useState("");
	const [incorrectPassword, setIncorrectPassword] = useState("");
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const successful = async (res) => {
		setProgress(80);
		const userData = await res.json();
		persistCredentials(userData);
		setProgress(100);
		setTimeout(() => {
			navigate("/all");
		}, 1500);
		return;
	};

	const unsuccessful = async (res) => {
		setProgress(80);
		const data = await res.json();
		if (data?.type === "password") {
			setProgress(100);
			setIncorrectPassword(data?.message);
			return;
		}
		setIncorrectEmail(data?.message);
		setProgress(100);
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		const email = emailInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;

		setProgress(30);
		if (!email || !password) {
			setProgress(100);
			return;
		}

		try {
			authLogin(email, password).then((res) => {
				switch (res.status) {
					case 200:
						setProgress(50);
						successful(res);
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

	const persistCredentials = (data) => {
		const { token, user, email } = data;
		const userData = {
			token,
			user,
			email,
		};

		sessionStorage.setItem("userData", JSON.stringify(userData));
	};

	useEffect(() => {
		emailInputRef.current.focus();
	}, []);

	useEffect(() => {
		if (incorrectPassword) {
			setTimeout(() => {
				setIncorrectPassword("");
			}, 3000);
		}

		if (incorrectEmail) {
			setTimeout(() => {
				setIncorrectEmail("");
			}, 3000);
		}

		if (message) {
			setTimeout(() => {
				setMessage("");
			}, 3000);
		}

		if (TOKEN) {
			navigate("/all");
		}
	}, [incorrectPassword, incorrectEmail, message, TOKEN]);

	useEffect(() => {
		document.title = "Login | CCISLSG Suggestion Board";
	}, []);
	return (
		<div className='font-main'>
			<TopLoadingBar
				color='#FF7800'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={7}
			/>
			<div className='xxxs:flex'>
				{message && <p>{message}</p>}
				<form
					onSubmit={handleLogin}
					className='xxxs:mt-56 px-8 xs:w-full md:w-10/12 lg:w-5/12'>
					<Link to='/'>
						<img
							src={logo}
							alt='CCISLSG Logo'
							className='my-4 xxxs:w-20 h-20'
						/>
					</Link>
					<h1 className='text-primary font-semibold xxxs:'>
						CCISLSG Suggestion Board
					</h1>
					<h1 className='font-bold xxxs:text-3xl'>Welcome back!</h1>
					<div className='flex flex-col mt-4'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							required
							ref={emailInputRef}
							className={`border border-gray-300 rounded-md p-2 mt-4 w-full ${
								incorrectEmail && "border-red-700"
							}`}
						/>
						{incorrectEmail && <p className='text-red-700 mt-2'>{incorrectEmail}</p>}
					</div>
					<div className='flex flex-col mt-4'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							required
							className={`border border-gray-300 rounded-md p-2 mt-4 w-full ${
								incorrectPassword && "border-red-700"
							}`}
							ref={passwordInputRef}
						/>
						{incorrectPassword && (
							<p className='text-red-700 mt-2'>{incorrectPassword}</p>
						)}
					</div>
					<button
						onClick={handleLogin}
						className='w-full bg-primary py-2 text-center text-white font-semibold rounded-md mt-4'>
						Log in
					</button>
					<p className='mt-4 text-zinc-400'>
						Don't have an account?{" "}
						<span className='underline text-primary'>
							<Link to='/signup'>Sign Up</Link>
						</span>
					</p>
				</form>
				<img
					src={LoginBg}
					alt='Login Background Picture churmehi'
					className='xxxxs:hidden md:block h-screen w-full	object-cover'
				/>
			</div>
		</div>
	);
}

export default Login;
