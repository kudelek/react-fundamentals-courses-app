import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Info from '../../common/Info/Info';
import { getCourseInfo } from '../../helpers/getCourseInfo';
import { selectAuthors, selectCourses } from '../../store/selectors';
import { thunk_getCourse } from '../../store/courses/thunk';

import './CourseInfo.css';
import { store_getCourses } from '../../store/courses/actionCreators';
import { getCourse } from '../../services';

export default function CourseInfo() {
	const { courseId } = useParams();
	const authors = useSelector(selectAuthors);
	const [course] = useSelector(selectCourses);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(thunk_getCourse(courseId, setIsLoading));
	}, []);

	return (
		<div className='main-container'>
			{isLoading ? (
				'loading...'
			) : (
				<>
					<Link className='link' to='/courses'>
						&larr; Back to courses
					</Link>
					<h2>{course.title}</h2>
					<div className='courseinfo'>
						<span className='course-description'>{course.description}</span>
						<div className='information'>
							{getCourseInfo(course, authors, [
								'id',
								'duration',
								'creationDate',
								'authors',
							]).map(([title, content]) => (
								<Info
									key={title}
									infoTitle={title}
									infoContent={content}
									multiline={['authors']}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
