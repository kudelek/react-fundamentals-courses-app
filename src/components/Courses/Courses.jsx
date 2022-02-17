import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { loadAuthors, loadCourses } from '../../services';
import { saveCourses } from '../../store/courses/actionCreators';
import { saveAuthors } from '../../store/authors/actionCreators';

import './Courses.css';

export default function Courses() {
	const [searchQuery, setSearchQuery] = useState('');
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses);
	const history = useHistory();

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
		loadCourses().then((response) => {
			dispatch(saveCourses(response.data.result));
		});
		loadAuthors().then((response) => {
			dispatch(saveAuthors(response.data.result));
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
