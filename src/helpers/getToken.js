export const getToken = () => {
	//get the token from the local storage
	const userData = JSON.parse(sessionStorage.getItem("userData"));

	//if there is no token, return null
	if (!userData?.token) return null;

	return userData?.token;
};
