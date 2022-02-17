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

export const loadCourses = () => {
	return axios
		.get(`${baseURL}/courses/all`)
		.then((response) => response)
		.catch((e) => {
			alert(
				e.response.data.errors
					? e.response.data.errors.join('\n')
					: e.response.data.result ?? 'Something went wrong'
			);
		});
};

export const addCourse1 = (course) => {
	const headers = { Authorization: localStorage.getItem('token') };
	console.log(headers);
	console.log('course: ', course);
	const c = {
		title: 'string',
		description: 'string',
		duration: 5555,
		authors: ['string'],
	};

	return axios
		.put(`${baseURL}/courses/${course.id}`, c, { headers })
		.then((response) => response)
		.catch((e) => {
			alert(
				e.response.data.errors
					? e.response.data.errors.join('\n')
					: e.response.data.result ?? 'Something went wrong'
			);
		});
};

export const loadAuthors = () => {
	return axios
		.get(`${baseURL}/authors/all`)
		.then((response) => response)
		.catch((e) => {
			alert(
				e.response.data.errors
					? e.response.data.errors.join('\n')
					: e.response.data.result ?? 'Something went wrong'
			);
		});
};
