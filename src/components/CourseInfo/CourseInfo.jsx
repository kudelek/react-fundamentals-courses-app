import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Info from '../../common/Info/Info';
import { getCourseInfo } from '../../helpers/getCourseInfo';
import { selectAuthors, selectCourses } from '../../store/selectors';

import './CourseInfo.css';

export default function CourseInfo() {
	const { courseId } = useParams();
	const authors = useSelector(selectAuthors);
	const [course] = useSelector(selectCourses).filter(
		(course) => course.id === courseId
	);

	return (
		<div className='main-container'>
			{!(authors && course) ? (
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
