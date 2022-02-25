import { GET_USER, LOG_USER_IN, LOG_USER_OUT } from './actionTypes';

export const logUserIn = (user) => ({
	type: LOG_USER_IN,
	payload: user,
});

export const logUserOut = (user) => ({
	type: LOG_USER_OUT,
	payload: user,
});

export const getUser = (user) => ({
	type: GET_USER,
	payload: user,
});
