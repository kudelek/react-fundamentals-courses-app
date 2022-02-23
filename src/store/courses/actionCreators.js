import {
	SAVE_COURSE,
	REMOVE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

export const store_getCourses = (courses) => ({
	type: GET_COURSES,
	payload: courses,
});

export const store_addCourse = (course) => ({
	type: SAVE_COURSE,
	payload: course,
});

export const store_deleteCourse = (id) => ({
	type: REMOVE_COURSE,
	payload: id,
});

export const store_updateCourse = (course) => ({
	type: UPDATE_COURSE,
	payload: course,
});
