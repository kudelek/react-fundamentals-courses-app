import './Input.css';

export default function Input(props) {
	const { className, id, labelText, labelClassName, ...rest } = props;
	return (
		<div className={className}>
			<label
				className={
					labelClassName !== undefined
						? `input-label ${labelClassName}`
						: 'visually-hidden'
				}
				htmlFor={id}
			>
				{labelText}
			</label>
			<input id={id} className={`input ${id}`} {...rest} />
		</div>
	);
}
