import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import logo from "../assets/logo.png";

import TopLoadingBar from "react-top-loading-bar";
import { buildUrl } from "../utils/buildUrl.js";

function Login() {
	const { error } = useParams();
	const [message, setMessage] = useState(error || "");
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);
	const [incorrectEmail, setIncorrectEmail] = useState("");
	const [incorrectPassword, setIncorrectPassword] = useState("");
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

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
			await fetch(buildUrl("/auth/login"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			}).then(async (res) => {
				switch (res.status) {
					case 200:
						setProgress(100);
						const userData = await res.json();
						persistCredentials(userData);
						setTimeout(() => navigate("/dashboard"), 2000);
						break;

					case 400:
						const data = await res.json();
						if (data?.type === "password") {
							setIncorrectPassword(data?.message);
							return;
						}

						setIncorrectEmail(data?.message);
						break;
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			setProgress(100);
		}
	};

	const persistCredentials = (data) => {
		localStorage.setItem("token", data?.token);
		localStorage.setItem("user", data?.user?.username);
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
	}, [incorrectPassword, incorrectEmail, message]);

	console.log(message);
	return (
		<div className='font-main xxxxs:px-8 md:px-32'>
			<TopLoadingBar
				color='#FF7800'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={7}
			/>
			<div className='xxxs:flex flex-col gap-4 md:grid grid-cols-2'>
				{message && <p>{message}</p>}
				<form
					onSubmit={handleLogin}
					className='xxxs:mt-56'>
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
						{incorrectEmail && <p className='text-red-700'>{incorrectEmail}</p>}
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							required
							ref={emailInputRef}
							className={`border border-gray-300 rounded-md p-2 mt-4 w-full ${
								incorrectEmail && "border-red-700"
							}`}
						/>
					</div>
					<div className='flex flex-col mt-4'>
						{incorrectPassword && <p className='text-red-700'>{incorrectPassword}</p>}
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							required
							className={`border border-gray-300 rounded-md p-2 mt-4 w-full ${
								incorrectPassword && "border-red-700"
							}`}
							ref={passwordInputRef}
						/>
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
				<img />
			</div>
		</div>
	);
}

export default Login;
