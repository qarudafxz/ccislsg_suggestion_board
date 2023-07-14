import React from "react";

function Head() {
	return (
		<div className='py-4 bg-orange-600 text-white text-center xxxs:px-10 font-thin text-xs md:px-18'>
			<h1>
				Welcome to CCISLSG Suggestion Board. You only have{" "}
				<span className='font-bold underline'>1 suggestion</span> per day. After 24
				hours, you will be granted again to share your suggestion
			</h1>
		</div>
	);
}

export default Head;
