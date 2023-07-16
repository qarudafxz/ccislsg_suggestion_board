import React, { useEffect } from "react";

//components
import Head from "../components/Head";
import Navbar from "../components/Navbar";

//sections
import AboutHero from "../components/for-about/AboutHero";
import Partners from "../components/for-about/Partners";

//assets
import Bg from "../assets/bg.svg";

function About() {
	useEffect(() => {
		document.title = "About | CCISLSG Suggestion Board";
	}, []);
	return (
		<div
			className='font-main'
			style={{
				width: "100vw",
				height: "100vh",
				backgroundImage: `url(${Bg})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
				overflow: "hidden",
			}}>
			<Head />
			<Navbar />
			{/* sub pages */}
			<div
				style={{
					height: "calc(100% - 120px)",
					overflowY: "auto",
				}}>
				<AboutHero />
				<Partners />
				{/* officers component */}
			</div>
		</div>
	);
}

export default About;
