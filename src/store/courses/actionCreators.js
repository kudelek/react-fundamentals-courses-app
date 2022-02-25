import { GET_COURSES } from './actionTypes';

export const store_getCourses = (courses) => ({
	type: GET_COURSES,
	payload: courses,
});
