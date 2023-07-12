import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/getToken.js";

function YourSuggestions() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!getToken()) {
			return navigate("/login", { error: "Please login first to continue" });
		}
	}, []);
	return <div>YourSuggestions</div>;
}

export default YourSuggestions;
