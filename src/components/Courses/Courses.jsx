import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { selectCourses } from '../../store/selectors';

import { loadAuthors, getCourses } from '../../services';
import { store_getCourses } from '../../store/courses/actionCreators';
import { getAuthors } from '../../store/authors/actionCreators';
import { thunk_getCourses } from '../../store/courses/thunk';

import './Courses.css';

export default function Courses() {
	const [searchQuery, setSearchQuery] = useState('');
	const courses = useSelector(selectCourses);
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
		dispatch(thunk_getCourses());
		loadAuthors().then((response) => {
			dispatch(getAuthors(response.data.result));
		});
	}, [dispatch]);

	return (
		<>
			<div className='search-and-add-bar'>
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<div className='add'>
					<Button
						buttonText='Add new course'
						className='add-button'
						onClick={handleAddCourse}
					/>
				</div>
			</div>
			{courses.length === 0 ? (
				<div>There are no courses</div>
			) : (
				filteredCourses.map((course) => (
					<CourseCard
						key={course.id}
						id={course.id}
						title={course.title}
						description={course.description}
						authors={course.authors}
						duration={course.duration}
						creationDate={course.creationDate}
					/>
				))
			)}
		</>
	);
}
