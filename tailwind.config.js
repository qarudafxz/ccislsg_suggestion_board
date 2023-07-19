/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				main: ["Poppins", "sans-serif"],
			},
			screens: {
				xxxxs: "280px",
				xxxs: "320px",
				xxs: "375px",
				xs: "425px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1245px",
				xxl: "1536px",
			},
			backgroundColor: {
				primary: "#FF7800",
			},
			color: {
				primary: "#FF7800",
			},
			textColor: {
				primary: "#FF7800",
			},
			gradientColorStops: {
				from: "#FF6100",
				to: "#FFAE00",
			},
		},
	},
	plugins: [],
};
