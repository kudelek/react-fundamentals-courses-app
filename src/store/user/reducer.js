const userInitialState = { isAuth: false, name: '', email: '', token: '' };

export default function userReducer(
	state = userInitialState,
	{ type, payload }
) {
	switch (type) {
		case 'logUserIn': {
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
