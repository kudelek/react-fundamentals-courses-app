import {
	addCourse,
	deleteCourse,
	getCourses,
	updateCourse,
} from '../../services';
import {
	store_getCourses,
	store_addCourse,
	store_deleteCourse,
	store_updateCourse,
} from './actionCreators';

export const thunk_getCourses = () => async (dispatch) => {
	await getCourses().then((response) => {
		dispatch(store_getCourses(response.data.result));
	});
};

export const thunk_deleteCourse = (id, token) => async (dispatch) => {
	await deleteCourse(id, token).then(() => dispatch(store_deleteCourse(id)));
};

export const thunk_addCourse = (course, token) => async (dispatch) => {
	await addCourse(course, token).then(() => dispatch(store_addCourse(course)));
};

export const thunk_updateCourse = (course, token) => async (dispatch) => {
	await updateCourse(course, token).then((response) =>
		dispatch(store_updateCourse(response.data.result))
	);
};
