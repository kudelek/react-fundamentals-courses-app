import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

export default function UnAuthenticatedRoute({ children, ...rest }) {
	const authKey = localStorage.getItem('authKey');

	return (
		<Route {...rest}>{!authKey ? children : <Redirect to='/courses' />}</Route>
	);
}

UnAuthenticatedRoute.propTypes = {
	exact: PropTypes.bool,
	path: PropTypes.string.isRequired,
};
