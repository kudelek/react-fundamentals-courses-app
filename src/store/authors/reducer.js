import { CREATE_AUTHOR, SAVE_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export default function authorsReducer(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_AUTHORS: {
			return payload;
		}
		case CREATE_AUTHOR: {
			return [...state, payload];
		}
		default:
			return state;
	}
}
