import './Info.css';

export default function Info(props) {
	return (
		<div className='info-item'>
			<div className='info-title'>{props.infoTitle}</div>
			<div className='info-content'>{props.infoContent}</div>
		</div>
	);
}
