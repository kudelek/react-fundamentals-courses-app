import { getCurrentUser, logIn, logOut } from '../../services';
import { getUser, logUserIn, logUserOut } from './actionCreators';

export const thunk_getUser = () => async (dispatch) => {
	const token = localStorage.getItem('token');
	await getCurrentUser(token).then((response) => {
		localStorage.setItem('role', response.data.result.role);
		dispatch(getUser({ ...response.data.result, token }));
	});
};

export const thunk_logUserIn = (user, history) => async (dispatch) => {
	await logIn(user)
		.then((response) => {
			const token = response.data.result;
			const name = response.data.user.name;
			localStorage.setItem('userName', name);
			localStorage.setItem('token', token);
			dispatch(logUserIn({ ...user, name: name, token: token }));
			dispatch(thunk_getUser(token));
		})
		.then(() => {
			history.push('/courses');
		});
};

export const thunk_logUserOut = (history) => async (dispatch) => {
	await logOut(localStorage.getItem('token')).then(() => {
		localStorage.clear();
		dispatch(logUserOut());
		history.push('/login');
	});
};
