import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//assets
import Bg from "../assets/bg.svg";
import twirl from "../assets/twirl.png";
import circ from "../assets/circle.png";
//components
import Head from "../components/Head";
import Navbar from "../components/Navbar";

//icons
import { IoMegaphoneSharp } from "react-icons/io5";

import { motion } from "framer-motion";

function Home() {
	useEffect(() => {
		document.title = "CCISLSG Suggestion Board";
	}, []);

	return (
		<div
			className='font-main overflow-y-hidden'
			style={{
				backgroundImage: `url(${Bg})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "100vh",
			}}>
			<Head />
			<Navbar />
			<div className='pointer-events-none xxxs:px-10 md:px-32'>
				<div className='flex flex-col gap-4 mt-10 md:mt-52'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 1 }}>
						<IoMegaphoneSharp
							size={100}
							className='text-primary mx-auto -rotate-12 relative z-10'
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.1, duration: 1 }}>
						<h1 className='font-bold text-orange-900 text-center xxxs:text-3xl md:text-4xl xl:text-7xl'>
							Let your voices be{" "}
							<span className='bg-gradient-to-tr from-from to-to bg-clip-text text-transparent'>
								heard
							</span>
						</h1>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.4, duration: 1 }}>
						<p className='text-zinc-800 xxxs:text-left lg:text-center xl:w-6/12 text-lg mx-auto'>
							Provide your suggestions to the Local Student Government on how the
							government can take effective measures to bring about positive
							improvements for the college.
						</p>
					</motion.div>
					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.7, duration: 1 }}>
						<Link to='/signup'>
							<button className=' bg-white text-primary font-semibold py-2 px-4 rounded-full mt-8 cursor-pointer hover:bg-primary duration-150'>
								Get Started
							</button>
						</Link>
					</motion.button>
					<motion.div
						animate={{ y: [0, 35, 0] }}
						transition={{ duration: 4, repeat: Infinity }}
						className='absolute z-10 top-32'>
						<img
							className='pointer-events-none xxxs:hidden md:block w-48 h-auto'
							src={twirl}
							alt='twirl'
						/>
					</motion.div>
					<motion.div
						animate={{ y: [0, 50, 0] }}
						transition={{ duration: 4, repeat: Infinity, delay: 1.1 }}
						className='absolute z-10 bottom-32 right-40'>
						<img
							className='pointer-events-none xxxxs:hidden md:block w-48 h-auto -rotate-45'
							src={circ}
							alt='circ'
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default Home;
