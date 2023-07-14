import React, { useState, useEffect } from "react";

function Timer() {
	const timer = sessionStorage.getItem("timer");
	const [timeLeft, setTimeLeft] = useState(timer);

	useEffect(() => {
		if (timer) {
			const interval = setInterval(() => {
				setTimeLeft((prevTime) => {
					if (prevTime === "00:00:00") {
						clearInterval(interval);
						return prevTime;
					}

					const [hours, minutes, seconds] = prevTime.split(":").map(Number);

					if (seconds > 0) {
						return formatTime(hours, minutes, seconds - 1);
					} else if (minutes > 0) {
						return formatTime(hours, minutes - 1, 59);
					} else if (hours > 0) {
						return formatTime(hours - 1, 59, 59);
					} else {
						return "00:00:00";
					}
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [timer]);

	const formatTime = (hours, minutes, seconds) => {
		const formattedHours = String(hours).padStart(2, "0");
		const formattedMinutes = String(minutes).padStart(2, "0");
		const formattedSeconds = String(seconds).padStart(2, "0");
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	};

	return <div>{timeLeft}</div>;
}

export default Timer;
