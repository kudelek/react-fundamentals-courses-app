import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../../common/Button/Button';
import Info from '../../../../common/Info/Info';
import { getCourseInfo } from '../../../../helpers/getCourseInfo';
import { deleteCourse } from '../../../../store/courses/actionCreators';
import { selectAuthors } from '../../../../store/selectors';

import './CourseCard.css';

export default function CourseCard(props) {
	const authors = useSelector(selectAuthors);
	const history = useHistory();
	const dispatch = useDispatch();

	function handleShowCourse() {
		history.push(`/courses/${props.id}`);
	}

	function handleEditCourse() {
		console.log('Edit course button clicked!');
	}

	function handleDeleteCourse() {
		dispatch(deleteCourse(props));
	}

	return (
		<section className='course-card' id={props.id}>
			<div className='content'>
				<h1 className='content-title'>{props.title}</h1>
				<div className='content-description'>{props.description}</div>
			</div>
			<div className='info'>
				<div className='info-list'>
					{getCourseInfo(props, authors, [
						'authors',
						'duration',
						'creationDate',
					]).map(([title, content]) => (
						<Info key={title} infoTitle={title} infoContent={content} />
					))}
				</div>
				<div className='course-buttons'>
					<Button
						className='course-button'
						buttonText='Show course'
						onClick={handleShowCourse}
					/>
					<Button
						className='course-button'
						buttonText='Edit'
						onClick={handleEditCourse}
					/>
					<Button
						className='course-button'
						buttonText='Delete'
						onClick={handleDeleteCourse}
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
