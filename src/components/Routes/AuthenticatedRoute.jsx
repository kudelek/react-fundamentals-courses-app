import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

export default function AuthenticatedRoute({ children, ...rest }) {
	const token = localStorage.getItem('token');

	return (
		<Route {...rest}>{token ? children : <Redirect to='/login' />}</Route>
	);
}

AuthenticatedRoute.propTypes = {
	exact: PropTypes.bool,
	path: PropTypes.string.isRequired,
};
