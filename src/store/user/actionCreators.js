export function logUserIn(user) {
	console.log('user: ', user);
	return { type: 'logUserIn', payload: user };
}

export function logUserOut(user) {
	return { type: 'logUserOut', payload: user };
}
