import React, { useState, useEffect } from "react";

function NewHead() {
	const [context, setContext] = useState(
		"Welcome to CCISLSG Suggestion Board. You only have 1 suggestion per day. After 24 hours, you will be granted again to share your suggestion"
	);
	const contexts = [
		"The user garnered the most number of suggestions wins a reward from our developer this month.",
		"Keep it clean. Remember, swear words are not allowed.",
		"Respect and uplift others with your suggestions. Let's create a positive and supportive community.",
		"Make a greater impact for your college by providing the most pressing suggestions as possible.",
		"Your voice matters! Every suggestion you make will be carefully reviewed by our LSGs, driving real action.",
		"This project is created by Francis Tin-aon, a 3rd year BSIT student of CCIS.",
		"We are open for suggestions. If you have any suggestions for this project, please contact us.",
		"We care for your privacy. We do not collect any personal information from you.",
		"Your suggestions are anonymous. We do not collect any personal information from you.",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeout(() => {
				const randomIndex = Math.floor(Math.random() * contexts.length);
				const randomText = contexts[randomIndex];
				setContext(randomText);
			}, 4000);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='py-4 bg-orange-600 text-white text-center xxxs:px-10 font-thin text-xs md:px-18'>
			<h1 className='fade-in-out'>{context}</h1>
		</div>
	);
}

export default NewHead;
