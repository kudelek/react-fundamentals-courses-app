const userInitialState = { isAuth: false, name: '', email: '', token: '' };

export default function userReducer(
	state = userInitialState,
	{ type, payload }
) {
	switch (type) {
		case 'logUserIn': {
			localStorage.setItem('userName', payload.name);
			localStorage.setItem('authKey', payload.authKey);
			return {
				isAuth: true,
				name: payload.name,
				email: payload.email,
				token: payload.authKey,
			};
		}
		case 'logUserOut': {
			localStorage.clear();
			return {
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
