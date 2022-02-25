import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
	const role = localStorage.getItem('role');

	return (
		<Route {...rest}>
			{role === 'admin' ? children : <Redirect to='/courses' />}
		</Route>
	);
}
