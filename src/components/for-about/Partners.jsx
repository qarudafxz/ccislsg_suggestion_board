import React from "react";

import logo from "../../assets/logo.png";
import parago from "../../assets/parago.svg";

function Partners() {
	const images = ["parago", "logo"];

	return (
		<div className='flex flex-col gap-4 my-20 xxxs:px-10 md:px-32 lg:px-36'>
			<div className='m-auto'>
				<h1 className='font-bold text-orange-950 xxxs:text-xl text-center md:text-3xl lg:text-4xl'>
					Built with our{" "}
					<span className='bg-gradient-to-tr from-from to-to rounded-md text-white px-4'>
						trusted partners
					</span>
				</h1>
				<div className='flex items-center gap-12 place-content-center mt-14'>
					{images.map((image, index) => {
						return (
							<img
								key={index}
								src={image === "logo" ? logo : parago}
								alt={image}
								className='w-20 h-20'
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Partners;
