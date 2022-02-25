import { GET_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export default function authorsReducer(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case GET_AUTHORS: {
			return payload;
		}
		default:
			return state;
	}
}
