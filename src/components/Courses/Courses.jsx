import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { selectCourses, selectUserRole } from '../../store/selectors';
import { thunk_getAuthors } from '../../store/authors/thunk';
import { thunk_getCourses } from '../../store/courses/thunk';

import './Courses.css';

export default function Courses() {
	const [searchQuery, setSearchQuery] = useState('');
	const courses = useSelector(selectCourses);
	const role = useSelector(selectUserRole);
	const history = useHistory();
	const dispatch = useDispatch();

	const filteredCourses = filterCourses(courses, searchQuery);

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

	function handleAddCourse() {
		history.push('/courses/add');
	}

	useEffect(() => {
		dispatch(thunk_getAuthors());
		dispatch(thunk_getCourses());
	}, [dispatch]);

	return (
		<>
			<div className='search-and-add-bar'>
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				{role !== 'admin' ? (
					''
				) : (
					<div className='add'>
						<Button
							data-testid='add-course'
							buttonText='Add new course'
							className='add-button'
							onClick={handleAddCourse}
						/>
					</div>
				)}
			</div>
			{courses.length === 0 ? (
				<div data-testid='no-courses'>There are no courses</div>
			) : (
				filteredCourses.map((course) =>
					!course.id ? (
						'loading...'
					) : (
						<CourseCard
							key={course.id}
							id={course.id}
							title={course.title}
							description={course.description}
							authors={course.authors}
							duration={course.duration}
							creationDate={course.creationDate}
						/>
					)
				)
			)}
		</>
	);
}
