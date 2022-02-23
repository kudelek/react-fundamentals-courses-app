import { getCurrentUser } from '../../services';
import {
	LOG_USER_IN,
	LOG_USER_OUT,
	SET_USER_NAME,
	SET_USER_ROLE,
} from './actionTypes';

const token = localStorage.getItem('token');

const userInitialState = {
	isAuth: !!token,
	name: localStorage.getItem('userName') || '',
	email: '',
	token: token || '',
	role: token
		? getCurrentUser(token).then((response) => response.data.result.role)
		: '',
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
		case SET_USER_ROLE: {
			return {
				...state,
				role: payload,
			};
		}
		case SET_USER_NAME: {
			return {
				...state,
				name: payload === null ? 'null' : payload,
			};
		}
		default:
			return state;
	}
}
