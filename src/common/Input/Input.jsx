import './Input.css';

export default function Input(props) {
	const {
		className,
		id,
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
