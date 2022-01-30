import './Input.css';

export default function Input(props) {
	return (
		<div className={props.className}>
			<label className='visually-hidden' htmlFor='input'>
				{props.labelText}
			</label>
			<input
				id='input'
				placeholder={props.placeholderText}
				onChange={props.onChange}
				onInput={props.onInput}
				value={props.value}
			/>
		</div>
	);
}
