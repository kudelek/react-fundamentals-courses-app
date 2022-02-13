import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../../../../common/Button/Button';
import Info from '../../../../common/Info/Info';
import { getCourseInfo } from '../../../../helpers/getCourseInfo';
import { useAppContext } from '../../../../AppContext';

import './CourseCard.css';

export default function CourseCard(props) {
	const history = useHistory();
	const { authorsList } = useAppContext();

	function handleShowCourse() {
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
					{getCourseInfo(props, authorsList, [
						'authors',
						'duration',
						'creationDate',
					]).map(([title, content]) => (
						<Info key={title} infoTitle={title} infoContent={content} />
					))}
				</div>
				<div className='info-button'>
					<Button
						className='show-course-button'
						buttonText='Show course'
						onClick={handleShowCourse}
					/>
				</div>
			</div>
		</section>
	);
}

CourseCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	creationDate: PropTypes.string.isRequired,
	authors: PropTypes.array.isRequired,
};
