import { GET_USER, LOG_USER_IN, LOG_USER_OUT } from './actionTypes';

const userInitialState = {
	isAuth: '',
	name: '',
	email: '',
	token: '',
	role: '',
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
				role: payload.role,
			};
		}
		case LOG_USER_OUT: {
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			};
		}
		case GET_USER: {
			return {
				...state,
				isAuth: true,
				name: payload.name,
				email: payload.email,
				token: payload.token,
				role: payload.role,
			};
		}
		default:
			return state;
	}
}
