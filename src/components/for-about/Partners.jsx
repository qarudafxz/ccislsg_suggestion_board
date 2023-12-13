import React from "react";

import logo from "../../assets/logo.png";
import parago from "../../assets/parago.svg";
import aub from "../../assets/aub.png";
import mc from "../../assets/mc.jpg";
import mj from "../../assets/mj.jpg";

function Partners() {
	const images = ["parago", "logo"];

	return (
		<div className='flex flex-col gap-4 my-20 xxxs:px-10 md:px-32 lg:px-36'>
			<div className='m-auto'>
				<h1 className='font-bold text-orange-950 xxxs:text-xl text-center md:text-3xl lg:text-4xl'>
					Built with these skillful{" "}
					<span className='bg-gradient-to-tr from-from to-to rounded-md text-white px-4'>
						CCIS Students
					</span>
				</h1>
				<div className='flex items-center gap-12 place-content-center mt-14'>
					{/* {images.map((image, index) => {
						return (
							<img
								key={index}
								src={image === "logo" ? logo : parago}
								alt={image}
								className='w-20 h-20'
							/>
						);
					})} */}
					<div className='flex flex-col justify-center items-center gap-2'>
						<img
							src={aub}
							className='w-40'
						/>
						<h1 className='text-center font-bold text-2xl text-orange-950'>
							Aubriel Bolotaolo
						</h1>
						<p className='text-center text-white'>Front-end Developer</p>
					</div>
					<div className='flex flex-col justify-center items-center gap-2'>
						<img
							src={mj}
							className='w-40 rounded-full'
						/>
						<h1 className='text-center font-bold text-2xl text-orange-950'>
							MJ Miral
						</h1>
						<p className='text-center text-white'>Back-end Developer</p>
					</div>
					<div className='flex flex-col justify-center items-center gap-2'>
						<img
							src={mc}
							className='w-40 rounded-full'
						/>
						<h1 className='text-center font-bold text-2xl text-orange-950'>
							Mc Lourence Sinilong
						</h1>
						<p className='text-center text-white'>Back-end Developer</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Partners;
