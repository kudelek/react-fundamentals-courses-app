import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function AuthenticatedRoute({ children, ...rest }) {
	const authKey = localStorage.getItem('authKey');

	return (
		<Route {...rest}>{!authKey ? children : <Redirect to='/courses' />}</Route>
	);
}
