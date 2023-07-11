import { useNavigate } from "react-router-dom";

export const removeData = () => {
	const navigate = useNavigate();

	localStorage.removeItem("token");
	localStorage.removeItem("user");

	setTimeout(() => {
		navigate("/");
	}, 2000);
};
