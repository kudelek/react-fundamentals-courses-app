import './Input.css';

export default function Input(props) {
	const { className, id, labelText, labelClassName, inputClassName, ...rest } =
		props;
	return (
		<div className={className}>
			<label className={labelClassName ?? 'visually-hidden'} htmlFor={id}>
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
