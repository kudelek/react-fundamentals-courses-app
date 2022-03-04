import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../../common/Button/Button';
import Info from '../../../../common/Info/Info';
import { getCourseInfo } from '../../../../helpers/getCourseInfo';
import { selectAuthors, selectUserRole } from '../../../../store/selectors';
import { thunk_deleteCourse } from '../../../../store/courses/thunk';

import './CourseCard.css';

export default function CourseCard(props) {
	const authors = useSelector(selectAuthors);
	const role = useSelector(selectUserRole);
	const history = useHistory();
	const dispatch = useDispatch();

	function handleShowCourse() {
		history.push(`/courses/${props.id}`);
	}

	function handleEditCourse() {
		history.push(`/courses/update/${props.id}`);
	}

	function handleDeleteCourse() {
		dispatch(thunk_deleteCourse(props.id, localStorage.getItem('token')));
	}

	return (
		<section data-testid='course-card' className='course-card' id={props.id}>
			<div className='content'>
				<h1 data-testid='title' className='content-title'>
					{props.title}
				</h1>
				<div data-testid='description' className='content-description'>
					{props.description}
				</div>
			</div>
			<div className='info'>
				<div className='info-list'>
					{getCourseInfo(props, authors, [
						'authors',
						'duration',
						'creationDate',
					]).map(([title, content]) => (
						<Info
							testid={title.split(':', 1)[0].toLowerCase()}
							key={title}
							infoTitle={title}
							infoContent={content}
						/>
					))}
				</div>
				<div className='course-buttons'>
					<Button
						className='course-button'
						buttonText='Show course'
						onClick={handleShowCourse}
					/>
					{role === 'admin' ? (
						<>
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
						</>
					) : (
						''
					)}
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
