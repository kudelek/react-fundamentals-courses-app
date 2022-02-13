import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { getDuration } from '../../helpers/pipeDuration';

import './CreateCourse.css';
import { useAppContext } from '../../AppContext';

export default function CreateCourse() {
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseDuration, setCourseDuration] = useState('');
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [authorToBeCreated, setAuthorToBeCreated] = useState('');
	const { coursesList, setCoursesList, authorsList, setAuthorsList } =
		useAppContext();
	const history = useHistory();

	function handleAddAuthor(e, authorToBeAdded) {
		e.preventDefault();
		setCourseAuthorsList([
			...courseAuthorsList,
			{ id: authorToBeAdded.id, name: authorToBeAdded.name },
		]);
	}

	function handleDeleteAuthor(e, authorToBeDeleted) {
		e.preventDefault();
		for (let author of courseAuthorsList)
			if (author.id === authorToBeDeleted.id) {
				setCourseAuthorsList(
					courseAuthorsList.filter(
						(author) => author.id !== authorToBeDeleted.id
					)
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
			authorsList.filter((author) => author.name === authorToBeCreated).length >
			0
		) {
			alert('Author already exists!');
			return;
		}
		setAuthorsList([
			...authorsList,
			{
				id: uuid(),
				name: authorToBeCreated,
			},
		]);
		setAuthorToBeCreated('');
	}

	function handleCreateCourse(e) {
		let creationDate = new Date();

		e.preventDefault();
		if (courseAuthorsList.length === 0) {
			alert('Authors need to be added.');
			return;
		}
		if (parseInt(courseDuration, 10) === 0) {
			alert('Course duration must be greater than 0.');
			return;
		}
		if (courseDescription.length < 2) {
			alert('Course description must be at least 2 characters long.');
			return;
		}
		setCoursesList([
			...coursesList,
			{
				id: uuid(),
				title: courseTitle,
				description: courseDescription,
				creationDate: creationDate,
				duration: courseDuration,
				authors: courseAuthorsList.map((author) => author.id),
			},
		]);
		history.push('/courses');
	}

	return (
		<form onSubmit={handleCreateCourse}>
			<div className='title-and-create'>
				<Input
					id='course-title-input'
					className='course-title'
					inputClassName='flex width-90'
					value={courseTitle}
					onInput={(e) => setCourseTitle(e.target.value)}
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
					id='course-description'
					className='description-textarea'
					placeholder='Enter description...'
					value={courseDescription}
					onInput={(e) => setCourseDescription(e.target.value)}
					required
				/>
			</div>
			<div className='course-info'>
				<div className='create-author-and-duration'>
					<h2>Add author</h2>
					<Input
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
						id='course-duration-input'
						className='course-duration'
						labelClassName='course-duration-input-label'
						inputClassName='flex width-90'
						value={courseDuration}
						onInput={(e) => setCourseDuration(e.target.value)}
						placeholder='Enter duration in minutes...'
						type='number'
						min='1'
						labelText='Duration'
						required
					/>
					<div className='course-duration-display'>
						Duration: <span>{getDuration(courseDuration)}</span> hours
					</div>
				</div>
				<div className='course-authors-lists'>
					<h2>Authors</h2>
					{authorsList.length === 0 ? (
						<div>Author list is empty</div>
					) : (
						<>
							{authorsList
								.filter(
									(i) => !courseAuthorsList.filter((y) => y.id === i.id).length
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
					{courseAuthorsList.length === 0 ? (
						<div>Course author list is empty</div>
					) : (
						<>
							{courseAuthorsList.map((author) => (
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
