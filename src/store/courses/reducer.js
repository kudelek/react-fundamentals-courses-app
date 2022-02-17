import { ADD_COURSE, SAVE_COURSES } from './actionTypes';

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
			console.log('courses payload: ', payload);
			console.log([
				...state,
				{
					authors: payload.authors,
					id: payload.id,
					title: payload.title,
					description: payload.description,
					creationDate: payload.creationDate,
					duration: +payload.duration,
				},
			]);
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
		default:
			return state;
	}
}
