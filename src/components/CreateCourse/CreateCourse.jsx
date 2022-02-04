import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { getDuration } from '../../helpers/pipeDuration';

import './CreateCourse.css';

export default function CreateCourse({
	authorsList,
	setAuthorsList,
	coursesList,
	setCoursesList,
	setCreateCourseMode,
}) {
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseDuration, setCourseDuration] = useState(0);
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [authorToBeCreated, setAuthorToBeCreated] = useState('');

	function handleAddAuthor(e, authorToBeAdded) {
		e.preventDefault();
		for (let author of courseAuthorsList)
			if (author.id === authorToBeAdded.id) return;
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
		setAuthorsList([
			...authorsList,
			{
				id: uuid(),
				name: authorToBeCreated,
			},
		]);
	}

	function handleCreateCourse(e) {
		e.preventDefault();
		if (courseAuthorsList.length === 0) {
			alert('Authors need to be added.');
			return;
		}
		if (courseDuration === 0) {
			alert('Course duration must be greater than 0.');
			return;
		}
		if (courseDescription.length < 2) {
			alert('Course description must be at least 2 characters long.');
			return;
		}
		let creationDate = new Date().toLocaleDateString().replace('/', '.');
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
		setCreateCourseMode(false);
	}

	return (
		<form onSubmit={handleCreateCourse}>
			<div className='title-and-create'>
				<Input
					id='course-title-input'
					className='course-title'
					value={courseTitle}
					onInput={(e) => setCourseTitle(e.target.value)}
					placeholder='Enter title...'
					labelClassName='course-title-input-label'
					labelText='Title'
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
						labelText='Author name'
					/>
					<Button
						className='create-author-button'
						buttonText='Create author'
						onClick={(e) => handleCreateAuthor(e)}
					/>
					<></>
					<h2>Duration</h2>
					<Input
						id='course-duration-input'
						className='course-duration'
						labelClassName='course-duration-input-label'
						value={courseDuration}
						onInput={(e) => setCourseDuration(e.target.value)}
						placeholder='Enter duration in minutes...'
						type='number'
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
						<div>
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
						</div>
					)}
					<h2>Course authors</h2>
					{courseAuthorsList.length === 0 ? (
						<div>Course author list is empty</div>
					) : (
						<div>
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
						</div>
					)}
				</div>
			</div>
		</form>
	);
}
