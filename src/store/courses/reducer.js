import { GET_COURSES, SAVE_COURSE } from './actionTypes';

const coursesInitialState = [];

export default function coursesReducer(
	state = coursesInitialState,
	{ type, payload }
) {
	switch (type) {
		case GET_COURSES: {
			return payload;
		}
		case SAVE_COURSE: {
			return [...state, payload];
		}
		default:
			return state;
	}
}
