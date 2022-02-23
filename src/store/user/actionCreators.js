import {
	LOG_USER_IN,
	LOG_USER_OUT,
	SET_USER_NAME,
	SET_USER_ROLE,
} from './actionTypes';

export const logUserIn = (user) => ({
	type: LOG_USER_IN,
	payload: user,
});

export const logUserOut = (user) => ({
	type: LOG_USER_OUT,
	payload: user,
});

export const setUserRole = (role) => ({
	type: SET_USER_ROLE,
	payload: role,
});

export const setCurrentUserName = (name) => ({
	type: SET_USER_NAME,
	payload: name,
});
