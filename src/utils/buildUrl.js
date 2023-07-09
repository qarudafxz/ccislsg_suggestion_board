export const buildUrl = (path) => {
	return import.meta.env.DEV
		? `http://localhost:3002/api${path}`
		: `/api${path}`;
};
