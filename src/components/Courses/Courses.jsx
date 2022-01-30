import { useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { getAuthors } from '../../helpers/getAuthors';

export default function Courses(props) {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [searchQuery, setSearchQuery] = useState('');
	const filteredCourses = filterCourses(coursesList, searchQuery);

	function filterCourses(courses, query) {
		if (!query) {
			return courses;
		}

		return courses.filter((course) => {
			const courseName = course.title.toLowerCase();
			const courseId = course.id.toLowerCase();
			return courseName.includes(query) || courseId.includes(query);
		});
	}

	return (
		<>
			<div>
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				{filteredCourses.map((course) => (
					<CourseCard
						key={course.id}
						title={course.title}
						description={course.description}
						authors={getAuthors(course.authors, authorsList)}
						duration={course.duration}
						creationDate={course.creationDate}
					/>
				))}
			</div>
		</>
	);
}
