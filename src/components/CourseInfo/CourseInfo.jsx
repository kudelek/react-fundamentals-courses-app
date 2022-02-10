import { Link, useParams } from 'react-router-dom';

import Info from '../../common/Info/Info';
import { useAppContext } from '../../AppContext';
import { getCourseInfo } from '../../helpers/getCourseInfo';

import './CourseInfo.css';

export default function CourseInfo() {
	const { courseId } = useParams();
	const { coursesList, authorsList } = useAppContext();
	const course = coursesList.find((course) => course.id === courseId);

	return (
		<div className='main-container'>
			<Link className='link' to='/courses'>
				&larr; Back to courses
			</Link>
			<h2>{course.title}</h2>
			<div className='courseinfo'>
				<span className='description'>{course.description}</span>
				<div className='information'>
					{getCourseInfo(course, authorsList, [
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
		</div>
	);
}
