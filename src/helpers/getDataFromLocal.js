export const getUsernameAndEmail = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	if (!userData?.token) return null;

	return {
		username: userData?.user?.username,
		email: userData?.user?.email,
	};
};
