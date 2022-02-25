import {
	addCourse,
	deleteCourse,
	getCourses,
	updateCourse,
} from '../../services';
import { store_getCourses } from './actionCreators';

export const thunk_getCourses = () => async (dispatch) => {
	await getCourses().then((response) => {
		dispatch(store_getCourses(response.data.result));
	});
};

export const thunk_deleteCourse = (id) => async (dispatch) => {
	const token = localStorage.getItem('token');
	await deleteCourse(id, token).then(() => dispatch(thunk_getCourses(token)));
};

export const thunk_addCourse = (course) => async (dispatch) => {
	const token = localStorage.getItem('token');
	await addCourse(course, token).then(() => {
		dispatch(thunk_getCourses(token));
	});
};

export const thunk_updateCourse = (course) => async (dispatch) => {
	const token = localStorage.getItem('token');
	await updateCourse(course, token).then(() =>
		dispatch(thunk_getCourses(token))
	);
};
