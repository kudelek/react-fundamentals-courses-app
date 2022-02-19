import { ADD_COURSE, DELETE_COURSE, SAVE_COURSES } from './actionTypes';

const coursesInitialState = [];

export default function coursesReducer(
	state = coursesInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_COURSES: {
			return payload;
		}
		case ADD_COURSE: {
			return [
				...state,
				{
					authors: payload.authors,
					id: payload.id,
					title: payload.title,
					description: payload.description,
					creationDate: payload.creationDate,
					duration: +payload.duration,
				},
			];
		}
		case DELETE_COURSE: {
			return state.filter((course) => course.id !== payload.id);
		}
		default:
			return state;
	}
}
