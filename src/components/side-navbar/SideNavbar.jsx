import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sideMenu as MENU, logoutMenu as LOGOUT } from "../../data/SideMenu";

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
					className='xxxxs:block absolute z-10 m-4 md:hidden'
					onClick={() => setIsClicked(!isClicked)}
				/>
				<AnimatePresence>
					{isClicked && (
						<div className='flex gap-4 absolute top-0 left-0 z-10'>
							<motion.div
								initial={{ x: -1000 }}
								animate={{ x: 0 }}
								exit={{ x: -1000 }}
								transition={{ duration: 0.3 }}
								className='xxxxs:block pt-14 bg-[#1B1B1B] h-screen sm:hidden'>
								<div className='flex flex-col gap-10'>
									<img
										src={Logo}
										alt='CCISLSG Logo'
										className='xxxs:w-20 h-auto ml-8'
									/>
									{MENU?.map((item, idx) => {
										return (
											<div
												key={idx}
												className='flex gap-4 items-center'>
												<NavLink
													key={idx}
													to={item?.path}
													className={({ isActive }) =>
														"text-xs flex gap-6 items-center px-4 py-4 " +
														(isActive
															? "bg-primary text-white font-semibold duration-300 pl-4 border-l-8 border-primary w-full"
															: "text-white")
													}>
													<div className='flex gap-8 items-center pl-10'>
														<motion.div
															whileHover={{ x: -10 }}
															transition={{ duration: 0.3 }}>
															{item?.icon}
														</motion.div>
														{item?.title}
													</div>
												</NavLink>
											</div>
										);
									})}

									<button
										className='border border-white rounded-full px-4 py-2 hoverBtn text-white w-9/12 mx-auto'
										onClick={LOGOUT.fun}>
										{LOGOUT.title}
									</button>
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
				{/* pc */}
				<div className='xxxxs:hidden md:block sticky'>
					<div
						className='flex flex-col gap-8 pt-4 bg-[#1B1B1B] w-80'
						style={{
							height: "125vh",
						}}>
						<img
							src={Logo}
							alt='CCISLSG Logo'
							className='w-24 h-24 ml-14'
						/>
						{MENU?.map((item, idx) => {
							return (
								<div
									key={idx}
									className='flex gap-4 items-center'>
									{item?.name === "Logout" ? (
										useEffect(() => {
											removeData();
										}, [])
									) : (
										<NavLink
											key={idx}
											to={item?.path}
											className={({ isActive }) =>
												"flex gap-6 items-center px-4 py-4 " +
												(isActive
													? "bg-primary text-white font-semibold duration-300 pl-4 border-l-8 border-primary w-full"
													: "text-white")
											}>
											<div className='flex gap-8 items-center pl-10'>
												<motion.div
													whileHover={{ x: -10 }}
													transition={{ duration: 0.3 }}>
													{item?.icon}
												</motion.div>
												{item?.title}
											</div>
										</NavLink>
									)}
								</div>
							);
						})}
						<button
							className='flex gap-4 place-content-center border border-white rounded-full px-4 py-2 hoverBtn text-white w-9/12 mx-auto hover:font-bold'
							onClick={LOGOUT.fun}>
							<motion.div
								whileHover={{ x: -10 }}
								transition={{ duration: 0.3 }}>
								{LOGOUT.icon}
							</motion.div>
							{LOGOUT.title}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default SideNavbar;
