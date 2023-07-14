export const getUsernameAndEmail = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	if (!userData?.token) return null;

	return {
		username: userData?.user?.username,
		email: userData?.user?.email,
	};
};

export const getUserID = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	if (!userData?.token) return null;

	return userData?.user?._id;
};
