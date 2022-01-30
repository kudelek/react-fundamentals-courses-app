export default function Input(props) {
	return (
		<>
			<label>{props.labelText}</label>
			<input placeholder={props.placeholderText} onChange={props.onChange} />
		</>
	);
}
