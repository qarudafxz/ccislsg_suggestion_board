import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const menu = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "About",
			link: "/about",
		},
		{
			name: "Log in",
			link: "/login",
		},
		{
			name: "Sign up",
			link: "/signup",
		},
	];

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			{/* for mobile */}
			<div className='xxxs:block overflow-y-hidden sm:hidden'>
				<div className='px-12 flex justify-between items-center mt-4'>
					<Link
						to='/'
						className='cursor-pointer'>
						<img
							src={Logo}
							alt='CCISLSG Logo'
							className='w-14 h-14'
						/>
					</Link>
					<div className='absolute z-50 left-60 mt-2 xxs:left-72'>
						{isOpen ? (
							<IoMdClose
								size={30}
								onClick={handleToggle}
								className='text-white'
							/>
						) : (
							<CgMenuRightAlt
								size={30}
								onClick={handleToggle}
								className='text-primary'
							/>
						)}
					</div>
				</div>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ x: 1000 }}
							animate={{ x: 50 }}
							exit={{ x: 1000 }}
							transition={{ duration: 0.3 }}
							className='absolute z-40 top-0 w-full h-full bg-primary text-white'>
							<div className='flex flex-col gap-6 pt-52 pl-8'>
								{menu?.map((item, index) => {
									return (
										<Link
											to={item.link}
											key={index}>
											{item.name}
										</Link>
									);
								})}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			{/* for pc */}
			<div className='xxxs:hidden sm:block'>
				<div className='flex justify-between px-32 mt-2'>
					<Link
						to='/'
						className='cursor-pointer'>
						<img
							src={Logo}
							alt='CCISLSG Logo'
							className='w-14 h-14'
						/>
					</Link>

					<div className='flex gap-6 pt-8'>
						{menu?.map((item, index) => {
							return (
								<Link
									to={item.link}
									key={index}
									className='mouseHover hover:text-primary duration-150'>
									{item.name}
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
