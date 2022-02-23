import {
	SAVE_COURSE,
	REMOVE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

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
			return [
				...state,
				{
					authors: payload.authors,
					id: payload.id,
					title: payload.title,
					description: payload.description,
					creationDate: payload.creationDate,
					duration: payload.duration,
				},
			];
		}
		case UPDATE_COURSE: {
			return [
				state.map((course) => (course.id === payload.id ? payload : course)),
			];
		}
		case REMOVE_COURSE: {
			return state.filter((course) => course.id !== payload);
		}
		default:
			return state;
	}
}
