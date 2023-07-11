import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sideMenu as MENU } from "../../data/SideMenu";

import { SlClose } from "react-icons/sl";
import { BiMenu } from "react-icons/bi";

import { removeData } from "../../helpers/removeData.js";

import Logo from "../../assets/logo.png";

function SideNavbar() {
	const [isClicked, setIsClicked] = useState(false);

	return (
		<>
			{/* Mobile */}
			<div>
				<BiMenu
					size={40}
					className='xxxxs:block absolute -z-10 m-4 md:hidden'
					onClick={() => setIsClicked(!isClicked)}
				/>
				<AnimatePresence>
					{isClicked && (
						<div className='flex gap-4'>
							<motion.div
								initial={{ x: -1000 }}
								animate={{ x: 0 }}
								exit={{ x: -1000 }}
								transition={{ duration: 0.3 }}
								className='xxxxs:block pt-14 pl-10 pr-6 bg-[#ea580c] w-9/12 h-screen sm:hidden'>
								<div className='flex flex-col gap-10'>
									<img
										src={Logo}
										alt='CCISLSG Logo'
										className='xxxs:w-20 h-auto'
									/>
									{MENU?.map((item, idx) => {
										return (
											<div
												key={idx}
												className='flex gap-4 items-center'>
												<motion.div
													whileHover={{ x: -10 }}
													transition={{ duration: 0.3 }}>
													{item?.icon}
												</motion.div>
												{item?.name === "Logout" ? (
													useEffect(() => {
														removeData();
													}, [])
												) : (
													<Link
														key={idx}
														to={item?.path}
														className='text-white font-semibold'>
														{item?.title}
													</Link>
												)}
											</div>
										);
									})}
								</div>
							</motion.div>
							<motion.div
								initial={{ x: -1000 }}
								animate={{ x: 0 }}
								exit={{ x: -1000 }}
								transition={{ duration: 0.3 }}>
								<SlClose
									size={40}
									onClick={() => setIsClicked(!isClicked)}
									className='text-zinc-500 mt-10 xxxxs:block sm:hidden'
								/>
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export default SideNavbar;
