import './Info.css';

export default function Info(props) {
	console.log(props.multiline);
	console.log(props);
	return (
		<div className='info-item'>
			<div className='info-title'>{props.infoTitle}</div>
			{!(
				props.multiline &&
				props.multiline.find(
					(m) => props.infoTitle.toLowerCase().slice(0, -2) === m
				)
			) ? (
				<div className='info-content'>{props.infoContent}</div>
			) : (
				<div className='info-content-multiline'>
					{props.infoContent.split(', ').map((content, index) => (
						<div key={index} className='info-content-multiline-item'>
							{content}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
