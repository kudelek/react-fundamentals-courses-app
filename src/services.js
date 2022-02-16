import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const logIn = (user) => {
	return axios
		.post(`${baseURL}/login`, user)
		.then((response) => response)
		.catch((e) => {
			alert(
				e.response.data.errors
					? e.response.data.errors.join('\n')
					: e.response.data.result ?? 'Something went wrong'
			);
		});
};

export const logOut = (token) => {
	const headers = { Authorization: token };
	return axios
		.delete(`${baseURL}/logout`, {
			headers,
		})
		.catch((e) => {
			alert(
				e.response.data.errors
					? e.response.data.errors.join('\n')
					: e.response.data.result ?? 'Something went wrong'
			);
		});
};
