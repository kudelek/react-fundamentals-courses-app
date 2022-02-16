const userInitialState = { isAuth: false, name: '', email: '', token: '' };

export default function userReducer(
	state = userInitialState,
	{ type, payload }
) {
	switch (type) {
		case 'logUserIn': {
			localStorage.setItem('userName', payload.name);
			localStorage.setItem('token', payload.token);
			console.log(payload);
			return {
				...state,
				isAuth: true,
				name: payload.name,
				email: payload.email,
				token: payload.token,
			};
		}
		case 'logUserOut': {
			localStorage.clear();
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
