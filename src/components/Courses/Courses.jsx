import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import { mockedCoursesList } from '../../constants';
import './Courses.css';

export default function Courses(props) {
	// eslint-disable-next-line no-unused-vars
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [searchQuery, setSearchQuery] = useState('');
	const history = useHistory();

	const filteredCourses = filterCourses(coursesList, searchQuery);

	function filterCourses(courses, query) {
		if (!query) {
			return courses;
		}

		return courses.filter((course) => {
			const courseName = course.title.toLowerCase();
			const courseId = course.id.toLowerCase();
			return (
				courseName.includes(query.toLowerCase()) ||
				courseId.includes(query.toLowerCase())
			);
		});
	}

	return (
		<>
			<div className='search-and-add-bar'>
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<div className='add'>
					<Button
						buttonText='Add new course'
						className='add-button'
						onClick={() => history.push('/courses/add')}
					/>
				</div>
			</div>
			{filteredCourses.map((course) => (
				<CourseCard
					key={course.id}
					id={course.id}
					title={course.title}
					description={course.description}
					authors={course.authors}
					duration={course.duration}
					creationDate={course.creationDate}
				/>
			))}
		</>
	);
}
