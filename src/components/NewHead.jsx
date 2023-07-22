import React from "react";

function NewHead() {
	const date = new Date();
	return (
		<div className='py-4 bg-orange-600 text-white text-center xxxs:px-10 font-thin text-xs md:px-18'>
			<h1>
				Any user who submits the most top suggestions will be granted{" "}
				<span className='font-bold underline'>reward</span> from the developer by
				the end of{" "}
				<span className='font-bold underline'>
					{" "}
					{new Date(date).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
					})}
				</span>
				. 🏆
			</h1>
		</div>
	);
}

export default NewHead;
