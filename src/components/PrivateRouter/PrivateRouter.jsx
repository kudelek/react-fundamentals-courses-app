import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectUserRole } from '../../store/selectors';

export default function PrivateRoute({ children, ...rest }) {
	const role = useSelector(selectUserRole);

	return (
		<Route {...rest}>
			{role === 'admin' ? children : <Redirect to='/courses' />}
		</Route>
	);
}
