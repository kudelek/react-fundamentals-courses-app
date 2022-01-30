export default function Input(props) {
	return (
		<input placeholder={props.placeholderText} onChange={props.onChange} />
	);
}
