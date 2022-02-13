import PropTypes from 'prop-types';

export const Button = ({ buttonText, ...rest }) => (
	<button {...rest}>{buttonText}</button>
);

Button.propTypes = {
	buttonText: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
};
