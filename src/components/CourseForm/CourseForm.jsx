import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { getDuration } from '../../helpers/pipeDuration';
import { selectAuthors, selectCourses } from '../../store/selectors';
import { thunk_addCourse, thunk_updateCourse } from '../../store/courses/thunk';
import { thunk_addAuthor } from '../../store/authors/thunk';

import './CourseForm.css';

export default function CourseForm({ edit }) {
	const { courseId } = useParams();
	const authors = useSelector(selectAuthors);
	const [authorToBeCreated, setAuthorToBeCreated] = useState('');
	const [existingCourse] = useSelector(selectCourses).filter(
		(course) => course.id === courseId
	);
	const [course, setCourse] = useState({
		authors: [],
		creationDate: '',
		description: '',
		duration: '',
		title: '',
	});
	const dispatch = useDispatch();
	const history = useHistory();

	function handleAddAuthor(e, authorToBeAdded) {
		e.preventDefault();
		setCourse({
			...course,
			authors: [...course.authors, authorToBeAdded.id],
		});
	}

	function handleDeleteAuthor(e, authorToBeDeleted) {
		e.preventDefault();
		for (let author of course.authors) {
			if (author === authorToBeDeleted) {
				setCourse({
					...course,
					authors: course.authors.filter(
						(author) => author !== authorToBeDeleted
					),
				});
			}
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
		dispatch(
			thunk_addAuthor(
				{ name: authorToBeCreated },
				localStorage.getItem('token')
			)
		);
		setAuthorToBeCreated('');
	}

	function handleSubmitCourseForm(e) {
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

		edit
			? dispatch(
					thunk_updateCourse({
						...course,
						duration: +course.duration,
					})
			  )
			: dispatch(
					thunk_addCourse({
						...course,
						duration: +course.duration,
					})
			  );
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
		if (edit && existingCourse) {
			setCourse({
				...existingCourse,
				duration: String(existingCourse.duration),
				authors: existingCourse.authors,
			});
		}
	}, [existingCourse]);

	return !((edit && existingCourse) || !edit) ? (
		'loading...'
	) : (
		<form onSubmit={handleSubmitCourseForm}>
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
					<Button
						buttonText={edit ? 'Update course' : 'Create course'}
						className='create-course-button'
					/>
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
								.filter((i) => !course.authors.filter((y) => y === i.id).length)
								.map((author) =>
									!author.id ? (
										'loading...'
									) : (
										<div key={author.id} className='course-authors-add'>
											<div className='course-author-name'>{author.name}</div>
											<Button
												className='course-author-button'
												buttonText='Add author'
												onClick={(e) => handleAddAuthor(e, author)}
											/>
										</div>
									)
								)}
						</>
					)}
					<h2>Course authors</h2>
					{course.authors.length === 0 ? (
						<div>Course author list is empty</div>
					) : (
						<>
							{course.authors.map((author) => (
								<div key={author} className='course-authors-delete'>
									<div className='course-author-name'>
										{authors.filter((a) => a.id === author)[0].name}
									</div>
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
