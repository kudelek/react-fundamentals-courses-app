import { GET_COURSES } from './actionTypes';

const coursesInitialState = [];

export default function coursesReducer(
	state = coursesInitialState,
	{ type, payload }
) {
	switch (type) {
		case GET_COURSES: {
			return payload;
		}
		default:
			return state;
	}
}
