import { BsFillMegaphoneFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { IoBugSharp } from "react-icons/io5";
import { RiLogoutCircleFill } from "react-icons/ri";

export const sideMenu = [
	{
		id: 1,
		title: "All Suggestions",
		path: "/",
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
		path: "/",
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
		path: "/",
		icon: (
			<IoBugSharp
				size={25}
				className='text-white'
			/>
		),
	},
	{
		id: 4,
		title: "Logout",
		path: "/",
		icon: (
			<RiLogoutCircleFill
				size={25}
				className='text-white'
			/>
		),
	},
];
