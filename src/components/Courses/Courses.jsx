import { useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import CreateCourse from '../CreateCourse/CreateCourse';
import SearchBar from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { getAuthors } from '../../helpers/getAuthors';

import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import './Courses.css';

export default function Courses(props) {
	// eslint-disable-next-line no-unused-vars
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	// eslint-disable-next-line no-unused-vars
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [searchQuery, setSearchQuery] = useState('');
	const [isCreateCourseMode, setIsCreateCourseMode] = useState(false);

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
			{isCreateCourseMode ? (
				<CreateCourse
					setCreateCourseMode={setIsCreateCourseMode}
					authorsList={authorsList}
					setAuthorsList={setAuthorsList}
					coursesList={coursesList}
					setCoursesList={setCoursesList}
				/>
			) : (
				<>
					<div className='search-and-add-bar'>
						<SearchBar
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>
						<div className='add'>
							<Button
								buttonText='Add new course'
								className='add-button'
								onClick={() => setIsCreateCourseMode(true)}
							/>
						</div>
					</div>
					{filteredCourses.map((course) => (
						<CourseCard
							key={course.id}
							id={course.id}
							title={course.title}
							description={course.description}
							authors={getAuthors(course.authors, authorsList)}
							duration={course.duration}
							creationDate={course.creationDate}
						/>
					))}
				</>
			)}
		</>
	);
}
