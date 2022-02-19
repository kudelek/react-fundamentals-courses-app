import { SAVE_AUTHOR, GET_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export default function authorsReducer(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case GET_AUTHORS: {
			return payload;
		}
		case SAVE_AUTHOR: {
			return [...state, payload];
		}
		default:
			return state;
	}
}
