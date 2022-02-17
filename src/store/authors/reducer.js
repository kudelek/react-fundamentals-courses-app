import {
	ADD_COURSE_AUTHOR,
	CREATE_AUTHOR,
	REMOVE_COURSE_AUTHOR,
	SAVE_AUTHORS,
} from './actionTypes';

const authorsInitialState = { authors: [], courseAuthors: [] };

export default function authorsReducer(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_AUTHORS: {
			return { ...state, authors: payload };
		}
		case CREATE_AUTHOR: {
			return { ...state, authors: [...state.authors, payload] };
		}
		case ADD_COURSE_AUTHOR: {
			return { ...state, courseAuthors: [...state.courseAuthors, payload] };
		}
		case REMOVE_COURSE_AUTHOR: {
			return {
				...state,
				courseAuthors: state.courseAuthors.filter(
					(author) => author.id !== payload.id
				),
			};
		}
		default:
			return state;
	}
}
