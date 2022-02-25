import axios from 'axios';

const baseURL = 'http://localhost:3000';

const alertErrors = (e) => {
	alert(
		e.response.data.errors
			? e.response.data.errors.join('\n')
			: e.response.data.result ?? 'Something went wrong'
	);
};

// USER

export const logIn = (user) => {
	return axios
		.post(`${baseURL}/login`, user)
		.then((response) => response)
		.catch((e) => alertErrors(e));
};

export const logOut = (token) => {
	const headers = { Authorization: token };
	return axios
		.delete(`${baseURL}/logout`, {
			headers,
		})
		.catch((e) => alertErrors(e));
};

export const getCurrentUser = (token) => {
	const headers = { Authorization: token };
	return axios
		.get(`${baseURL}/users/me`, { headers })
		.then((response) => response)
		.catch((e) => alertErrors(e));
};

// COURSES

export const getCourses = () => {
	return axios
		.get(`${baseURL}/courses/all`)
		.then((response) => response)
		.catch((e) => alertErrors(e));
};

export const getCourse = (id) => {
	return axios
		.get(`${baseURL}/courses/${id}`)
		.then((response) => response)
		.catch((e) => alertErrors(e));
};

export const addCourse = (course, token) => {
	const headers = { Authorization: token };
	return axios
		.post(`${baseURL}/courses/add`, course, { headers })
		.catch((e) => alertErrors(e));
};

export const deleteCourse = (id, token) => {
	const headers = { Authorization: token };
	return axios
		.delete(`${baseURL}/courses/${id}`, { headers })
		.catch((e) => alertErrors(e));
};

export const updateCourse = (course, token) => {
	const headers = { Authorization: token };
	return axios
		.put(`${baseURL}/courses/${course.id}`, course, { headers })
		.catch((e) => alertErrors(e));
};

// AUTHORS

export const getAuthors = () => {
	return axios
		.get(`${baseURL}/authors/all`)
		.then((response) => response)
		.catch((e) => alertErrors(e));
};

export const addAuthor = (author, token) => {
	const headers = { Authorization: token };
	return axios
		.post(`${baseURL}/authors/add`, author, { headers })
		.then((response) => response)
		.catch((e) => alertErrors(e));
};
