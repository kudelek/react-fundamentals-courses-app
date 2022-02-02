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

	const courseInfo = [
		['Authors: ', props.authors],
		['Duration: ', getDuration(props.duration)],
		['Created: ', dateGenerator(props.creationDate)],
	];

	return (
		<section className='course-card' id={props.id}>
			<div className='content'>
				<h1 className='content-title'>{props.title}</h1>
				<div className='content-description'>{props.description}</div>
			</div>
			<div className='info'>
				<div className='info-list'>
					{courseInfo.map(([title, content]) => (
						<Info key={title} infoTitle={title} infoContent={content} />
					))}
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
