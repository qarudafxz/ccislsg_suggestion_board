import React from "react";

//components
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//sections
import AboutHero from "../components/for-about/AboutHero";

//assets
import Bg from "../assets/bg.svg";

function About() {
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
			</div>
			<Footer />
		</div>
	);
}

export default About;
