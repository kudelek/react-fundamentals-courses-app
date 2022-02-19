import { LOG_USER_IN, LOG_USER_OUT } from './actionTypes';

const userInitialState = {
	isAuth: !!localStorage.getItem('token'),
	name: localStorage.getItem('userName') || '',
	email: '',
	token: localStorage.getItem('token') || '',
};

export default function userReducer(
	state = userInitialState,
	{ type, payload }
) {
	switch (type) {
		case LOG_USER_IN: {
			return {
				...state,
				isAuth: true,
				name: payload.name,
				email: payload.email,
				token: payload.token,
			};
		}
		case LOG_USER_OUT: {
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		}
		default:
			return state;
	}
}
