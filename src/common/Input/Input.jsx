import './Input.css';

export default function Input(props) {
	const { className, id, labelText, ...rest } = props;
	return (
		<div className={className}>
			<label className='visually-hidden' htmlFor={id}>
				{labelText}
			</label>
			<input id={id} {...rest} />
		</div>
	);
}
