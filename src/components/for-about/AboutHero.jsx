import React from "react";

import char from "../../assets/character.png";

import { motion } from "framer-motion";

function AboutHero() {
	return (
		<div className='xxxs:px-10 md:px-32 lg:px-36'>
			<div className='mt-24 xxxs:flex flex-col-reverse gap-10 md:grid grid-cols-2 gap-8'>
				<div className='flex flex-col gap-8'>
					<h1 className='font-bold text-orange-900 xxxs:text-3xl md:text-4xl lg:text-7xl'>
						About CCISLSG{" "}
						<span className='bg-gradient-to-tr from-from to-to bg-clip-text text-transparent'>
							Suggestion Board
						</span>
					</h1>
					<div className='text-orange-900 flex flex-col gap-10'>
						<p>
							Welcome to a platform dedicated to amplifying the voices of CCIS college
							students! We firmly believe that students are the catalysts for a vibrant
							and thriving educational community. Our website provides an opportunity
							for CCIS students to share their invaluable suggestions with the local
							student government, with the ultimate goal of enhancing the college
							experience for all.
						</p>
						<p>
							This platform serves as a hub for constructive ideas and innovative
							solutions. Students can contribute suggestions for improving campus
							facilities, enhancing academic programs, and addressing social and
							cultural issues. By actively participating and sharing diverse
							perspectives, students contribute to shaping the future of the college,
							fostering an environment that caters to the needs and aspirations of
							every CCIS student.
						</p>
						<p>
							We encourage students to engage in thoughtful discussions, collaborate
							with peers, and work hand in hand with the student government to bring
							about positive change.
						</p>
					</div>
				</div>
				<motion.div
					animate={{ y: [0, 30, 0] }}
					transition={{ duration: 4, repeat: Infinity }}>
					<img
						src={char}
						alt='3D Character'
						className='pointer-events-none'
					/>
				</motion.div>
			</div>
		</div>
	);
}

export default AboutHero;
