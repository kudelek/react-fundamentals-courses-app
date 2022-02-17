import {
	ADD_COURSE,
	DELETE_COURSE,
	SAVE_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

export const saveCourses = (courses) => ({
	type: SAVE_COURSES,
	payload: courses,
});

export const addCourse = (course) => ({
	type: ADD_COURSE,
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
