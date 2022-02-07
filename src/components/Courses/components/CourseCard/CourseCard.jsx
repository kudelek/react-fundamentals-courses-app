import { useHistory } from 'react-router-dom';

import { Button } from '../../../../common/Button/Button';
import Info from '../../../../common/Info/Info';
import { getCourseInfo } from '../../../../helpers/getCourseInfo';

import './CourseCard.css';

export default function CourseCard(props) {
	const history = useHistory();

	function handleShowCourse(e) {
		e.preventDefault();
		history.push(`/courses/${props.id}`);
	}

	return (
		<section className='course-card' id={props.id}>
			<div className='content'>
				<h1 className='content-title'>{props.title}</h1>
				<div className='content-description'>{props.description}</div>
			</div>
			<div className='info'>
				<div className='info-list'>
					{getCourseInfo(props).map(([title, content]) => (
						<Info key={title} infoTitle={title} infoContent={content} />
					))}
				</div>
				<div className='info-button'>
					<Button
						className='show-course-button'
						buttonText='Show course'
						onClick={(e) => handleShowCourse(e)}
					/>
				</div>
			</div>
		</section>
	);
}
