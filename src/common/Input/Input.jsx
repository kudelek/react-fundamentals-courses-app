import PropTypes from 'prop-types';

import './Input.css';

export default function Input(props) {
	Object.entries(props).map((prop) =>
		console.log(
			Object.values(prop)[0],
			Object.values(prop)[1],
			typeof Object.values(prop)[1]
		)
	);
	const {
		id,
		className,
		label,
		labelText,
		labelClassName,
		inputClassName,
		...rest
	} = props;
	return (
		<div className={className}>
			<label
				className={
					!(label || labelClassName) ? 'visually-hidden' : labelClassName ?? ''
				}
				htmlFor={id}
			>
				{labelText}
			</label>
			<input
				id={id}
				className={inputClassName ? `input ${inputClassName}` : 'input'}
				{...rest}
			/>
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	label: PropTypes.bool,
	labelText: PropTypes.string.isRequired,
	labelClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	value: PropTypes.string.isRequired,
	onInput: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	required: PropTypes.bool,
	min: PropTypes.string,
};
