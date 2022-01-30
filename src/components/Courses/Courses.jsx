import { useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import CourseCard from './components/CourseCard/CourseCard';

export default function Courses(props) {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

	console.log(coursesList);
	console.log(mockedAuthorsList);
	console.log(authorsList);

	function getAuthors(authorsIds) {
		let authors = [];
		for (let authorId of authorsIds) {
			for (let author of authorsList) {
				if (author.id === authorId) authors.push(author.name);
			}
		}
		return authors.join(', ');
	}

	return (
		<>
			<div>
				{coursesList.map((course) => (
					<CourseCard
						key={course.id}
						title={course.title}
						description={course.description}
						authors={getAuthors(course.authors)}
						duration={course.duration}
						creationDate={course.creationDate}
					/>
				))}
			</div>
		</>
	);
}
