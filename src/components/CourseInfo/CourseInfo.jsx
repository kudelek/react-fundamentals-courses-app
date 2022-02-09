import { Link, useParams } from 'react-router-dom';

import Info from '../../common/Info/Info';
import { getCourseInfo } from '../../helpers/getCourseInfo';

import { mockedCoursesList } from '../../constants';
import './CourseInfo.css';

export default function CourseInfo() {
	const { courseId } = useParams();
	const course = mockedCoursesList.filter(
		(course) => course.id === courseId
	)[0];
	return (
		<div className='main-container'>
			<Link className='link' to='/courses'>
				&larr; Back to courses
			</Link>
			<h2>{course.title}</h2>
			<div className='courseinfo'>
				<span className='description'>{course.description}</span>
				<div className='information'>
					{getCourseInfo(course, ['id', 'duration', 'created']).map(
						([title, content]) => (
							<Info key={title} infoTitle={title} infoContent={content} />
						)
					)}
					{getCourseInfo(course, ['authors']).map(([title, content]) => (
						<Info
							key={title}
							infoTitle={title}
							infoContent={content}
							multiline
						/>
					))}
				</div>
			</div>
		</div>
	);
}
