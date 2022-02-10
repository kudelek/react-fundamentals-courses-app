import './Info.css';

export default function Info(props) {
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
					{props.infoContent.split(', ').map((content) => (
						<div key={content} className='info-content-multiline-item'>
							{content}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
