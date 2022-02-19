import {
	SAVE_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

export const getCourses = (courses) => ({
	type: GET_COURSES,
	payload: courses,
});

export const addCourse = (course) => ({
	type: SAVE_COURSE,
	payload: course,
});

export const deleteCourse = (id) => ({
	type: DELETE_COURSE,
	payload: id,
});

export const updateCourse = (course) => ({
	type: UPDATE_COURSE,
	course,
});
