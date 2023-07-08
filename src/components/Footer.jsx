import React from "react";

function Footer() {
	const date = new Date();
	return (
		<div className='bg-primary absolute bottom-0 w-full text-orange-900 py-2 xxxs:px-4 text-sm lg:px-24 text-lg xl:px-36'>
			<h1 className='text-center'>{`CCISLSG © ${date.getFullYear()} All Rights Reserved`}</h1>
		</div>
	);
}

export default Footer;
