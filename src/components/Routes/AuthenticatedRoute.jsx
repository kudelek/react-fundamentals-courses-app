import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useAppContext } from '../../AppContext';

export default function AuthenticatedRoute({ children, ...rest }) {
	const { isAuthenticated } = useAppContext();
	const authKey = localStorage.getItem('authKey');

	return (
		<Route {...rest}>
			{authKey && isAuthenticated ? children : <Redirect to='/login' />}
		</Route>
	);
}
