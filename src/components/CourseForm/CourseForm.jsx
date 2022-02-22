import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { getDuration } from '../../helpers/pipeDuration';
import { addCourse } from '../../store/courses/actionCreators';
import { createAuthor, getAuthors } from '../../store/authors/actionCreators';
import { selectAuthors } from '../../store/selectors';

import './CourseForm.css';
import { loadAuthors } from '../../services';

export default function CourseForm() {
	const [courseAuthors, setCourseAuthors] = useState([]);
	const authors = useSelector(selectAuthors);
	const [authorToBeCreated, setAuthorToBeCreated] = useState('');
	const [course, setCourse] = useState({
		authors: [],
		creationDate: '',
		description: '',
		duration: '',
		id: uuid(),
		title: '',
	});
	const dispatch = useDispatch();
	const history = useHistory();

	function handleAddAuthor(e, authorToBeAdded) {
		e.preventDefault();
		setCourseAuthors([...courseAuthors, authorToBeAdded]);
		setCourse({
			...course,
			authors: [
				...courseAuthors,
				{ id: authorToBeAdded.id, name: authorToBeAdded.name },
			].map((courseAuthor) => courseAuthor.id),
		});
	}

	function handleDeleteAuthor(e, authorToBeDeleted) {
		e.preventDefault();
		for (let author of courseAuthors)
			if (author.id === authorToBeDeleted.id) {
				setCourseAuthors(
					courseAuthors.filter((author) => author.id !== authorToBeDeleted.id)
				);
			}
	}

	function handleCreateAuthor(e) {
		e.preventDefault();
		if (authorToBeCreated.length < 2) {
			alert('Author name must be at least 2 characters long.');
			return;
		}
		if (
			authors.filter((author) => author.name === authorToBeCreated).length > 0
		) {
			alert('Author already exists!');
			return;
		}
		dispatch(createAuthor({ id: uuid(), name: authorToBeCreated }));
		setAuthorToBeCreated('');
	}

	function handleCourseForm(e) {
		e.preventDefault();
		if (course.authors.length === 0) {
			alert('Authors need to be added.');
			return;
		}
		if (parseInt(course.duration, 10) === 0) {
			alert('Course duration must be greater than 0.');
			return;
		}
		if (course.description.length < 2) {
			alert('Course description must be at least 2 characters long.');
			return;
		}

		dispatch(addCourse(course));
		setCourseAuthors([]);
		history.push('/courses');
	}

	function handleChange(e) {
		const creationDate = new Date().toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
		const name = e.target.name;
		const value = e.target.value;
		setCourse({ ...course, [name]: value, creationDate: creationDate });
	}

	useEffect(() => {
		loadAuthors().then((response) =>
			dispatch(getAuthors(response.data.result))
		);
	}, [dispatch]);

	return (
		<form onSubmit={handleCourseForm}>
			<div className='title-and-create'>
				<Input
					name='title'
					id='course-title-input'
					className='course-title'
					inputClassName='flex width-90'
					value={course.title}
					onInput={handleChange}
					placeholder='Enter title...'
					labelText='Title'
					label
					required
				/>
				<div className='create-course'>
					<Button buttonText='Create course' className='create-course-button' />
				</div>
			</div>
			<div className='description'>
				<label htmlFor='course-description' className='description-label'>
					Description
				</label>
				<textarea
					name='description'
					id='course-description'
					className='description-textarea'
					placeholder='Enter description...'
					value={course.description}
					onInput={handleChange}
					required
				/>
			</div>
			<div className='course-info'>
				<div className='create-author-and-duration'>
					<h2>Add author</h2>
					<Input
						name='authorToBeCreated'
						id='create-author-input'
						className='create-author'
						value={authorToBeCreated}
						onInput={(e) => setAuthorToBeCreated(e.target.value)}
						placeholder='Enter author name...'
						labelClassName='create-author-input-label'
						inputClassName='flex width-90'
						labelText='Author name'
					/>
					<Button
						className='create-author-button'
						buttonText='Create author'
						onClick={handleCreateAuthor}
					/>
					<h2>Duration</h2>
					<Input
						name='duration'
						id='course-duration-input'
						className='course-duration'
						labelClassName='course-duration-input-label'
						inputClassName='flex width-90'
						value={course.duration}
						onInput={handleChange}
						placeholder='Enter duration in minutes...'
						type='number'
						min='1'
						labelText='Duration'
						required
					/>
					<div className='course-duration-display'>
						Duration: <span>{getDuration(course.duration)}</span> hours
					</div>
				</div>
				<div className='course-authors-lists'>
					<h2>Authors</h2>
					{authors.length === 0 ? (
						<div>Author list is empty</div>
					) : (
						<>
							{authors
								.filter(
									(i) => !courseAuthors.filter((y) => y.id === i.id).length
								)
								.map((author) => (
									<div key={author.id} className='course-authors-add'>
										<div className='course-author-name'>{author.name}</div>
										<Button
											className='course-author-button'
											buttonText='Add author'
											onClick={(e) => handleAddAuthor(e, author)}
										/>
									</div>
								))}
						</>
					)}
					<h2>Course authors</h2>
					{courseAuthors.length === 0 ? (
						<div>Course author list is empty</div>
					) : (
						<>
							{courseAuthors.map((author) => (
								<div key={author.id} className='course-authors-delete'>
									<div className='course-author-name'>{author.name}</div>
									<Button
										className='course-author-button'
										buttonText='Delete author'
										onClick={(e) => handleDeleteAuthor(e, author)}
									/>
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</form>
	);
}
