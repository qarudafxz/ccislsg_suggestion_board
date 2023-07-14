import React from "react";
import logo from "../assets/logo.png";

function Preloader() {
	return (
		<img
			src={logo}
			alt='logo'
			className='fade-in relative m-auto xxxxs:w-10/12 md:w-2/12 top-72'
		/>
	);
}

export default Preloader;
