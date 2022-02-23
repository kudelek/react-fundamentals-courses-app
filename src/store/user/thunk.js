import { getCurrentUser, logIn, logOut } from '../../services';
import { logUserIn, logUserOut, setCurrentUserName } from './actionCreators';

export const thunk_logUserIn = (user, history) => async (dispatch) => {
	await logIn(user)
		.then((response) => {
			const token = response.data.result;
			const name = response.data.user.name;
			localStorage.setItem('userName', name);
			localStorage.setItem('token', token);
			dispatch(logUserIn({ ...user, name: name, token: token }));
		})
		.then(() => history.push('/courses'));
};

export const thunk_logUserOut = (token, history) => async (dispatch) => {
	await logOut(token).then(() => {
		localStorage.clear();
		dispatch(logUserOut());
		history.push('/login');
	});
};

export const thunk_getCurrentUserName = (token) => async (dispatch) => {
	await getCurrentUser(token).then((response) => {
		dispatch(setCurrentUserName(response.data.result.name));
	});
};
