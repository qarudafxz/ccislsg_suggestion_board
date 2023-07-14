import { BsFillMegaphoneFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { IoBugSharp } from "react-icons/io5";
import { RiLogoutCircleFill } from "react-icons/ri";

export const sideMenu = [
	{
		id: 1,
		title: "All Suggestions",
		path: "/all",
		icon: (
			<BsFillMegaphoneFill
				size={25}
				className='text-white'
			/>
		),
	},
	{
		id: 2,
		title: "Your Suggestions",
		path: "/your-suggestions",
		icon: (
			<FaClipboardList
				size={25}
				className='text-white'
			/>
		),
	},
	{
		id: 3,
		title: "Report Bug",
		path: "/report",
		icon: (
			<IoBugSharp
				size={25}
				className='text-white'
			/>
		),
	},
];

export const logoutMenu = {
	title: "Logout",
	icon: (
		<RiLogoutCircleFill
			size={25}
			className='text-white hoverBtn'
		/>
	),
	fun: () => {
		localStorage.removeItem("userData");

		setTimeout(() => (window.location.href = "/"), 2000);
	},
};
