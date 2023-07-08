import React from "react";
import { Link } from "react-router-dom";

//assets
import Bg from "../assets/bg.svg";
//components
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//icons
import { IoMegaphoneSharp } from "react-icons/io5";

import { motion } from "framer-motion";

function Home() {
	return (
		<div
			className='font-main overflow-hidden'
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
						<h1 className='font-bold text-orange-900 text-center xxxs:text-lg md:text-4xl xl:text-7xl'>
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
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
