import { Button } from '../../../../common/Button/Button';
import './CourseCard.css';
import { getDuration } from '../../../../helpers/pipeDuration';
import { dateGenerator } from '../../../../helpers/dateGenerator';

export default function CourseCard(props) {
	function Info(props) {
		return (
			<div className='info-item'>
				<div className='info-title'>{props.infoTitle}</div>
				<div className='info-content'>{props.infoContent}</div>
			</div>
		);
	}

	return (
		<section className='course-card' id={props.id}>
			<div className='content'>
				<h1 className='content-title'>{props.title}</h1>
				<div className='content-description'>{props.description}</div>
			</div>
			<div className='info'>
				<div className='info-list'>
					<Info infoTitle='Authors: ' infoContent={props.authors} />
					<Info
						infoTitle='Duration: '
						infoContent={getDuration(props.duration)}
					/>
					<Info
						infoTitle='Created: '
						infoContent={dateGenerator(props.creationDate)}
					/>
				</div>
				<div className='info-button'>
					<Button
						className='show-course-button'
						buttonText='Show course'
						onClick={(e) => console.log(e.target.innerHTML, 'button clicked!')}
					/>
				</div>
			</div>
		</section>
	);
}
