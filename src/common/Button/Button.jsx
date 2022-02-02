export const Button = (props) => (
	<button className={props.className} onClick={props.onClick}>
		{props.buttonText}
	</button>
);
