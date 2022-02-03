import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Button } from '../../common/Button/Button';
import { getDuration } from '../../helpers/pipeDuration';

import Input from '../../common/Input/Input';

export default function CreateCourse({
	authorsList,
	setAuthorsList,
	coursesList,
	setCoursesList,
	setCreateCourseMode,
}) {
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseDuration, setCourseDuration] = useState('');
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [authorToBeCreated, setauthorToBeCreated] = useState('');

	// TO DO: ADD VALIDATION
	// TO DO: MAKE FIELDS REQUIRED

	function handleAddAuthor(e, authorToBeAdded) {
		e.preventDefault();
		for (let author of courseAuthorsList)
			if (author.id === authorToBeAdded.id) return;
		setCourseAuthorsList([
			...courseAuthorsList,
			{ id: authorToBeAdded.id, name: authorToBeAdded.name },
		]);
		setAuthorsList(
			authorsList.filter((author) => author.id !== authorToBeAdded.id)
		);
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
				setAuthorsList([
					...authorsList,
					{ id: authorToBeDeleted.id, name: authorToBeDeleted.name },
				]);
			}
	}

	function handleCreateAuthor(e) {
		e.preventDefault();
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
		<>
			<form>
				<div>
					<Input
						id='course-title-input'
						value={courseTitle}
						onInput={(e) => setCourseTitle(e.target.value)}
						className='title-input'
						placeholder='Enter title...'
						labelClassName='title-input-label'
						labelText='Title'
					/>
					<Button
						buttonText='Create course'
						onClick={(e) => handleCreateCourse(e)}
					/>
				</div>
				<div>
					<label htmlFor='course-description'>Description</label>
					<textarea
						id='course-description'
						placeholder='Enter description...'
						value={courseDescription}
						onInput={(e) => setCourseDescription(e.target.value)}
					/>
				</div>
				<div>
					<div>
						<h2>Add author</h2>
						<Input
							id='create-author-input'
							value={authorToBeCreated}
							onInput={(e) => setauthorToBeCreated(e.target.value)}
							placeholder='Enter author name...'
						/>
						<Button
							buttonText='Create author'
							onClick={(e) => handleCreateAuthor(e)}
						/>
						<></>
						<h2>Duration</h2>
						<Input
							id='course-duration-input'
							value={courseDuration}
							onInput={(e) => setCourseDuration(getDuration(e.target.value))}
							placeholder='Enter duration in minutes...'
						/>
						<span>
							Duration: <span>{courseDuration}</span> hours
						</span>
					</div>
					<div>
						<h2>Authors</h2>
						{authorsList.map((author) => (
							<div key={author.id}>
								<div>{author.name}</div>
								<Button
									buttonText='Add author'
									onClick={(e) => handleAddAuthor(e, author)}
								/>
							</div>
						))}
						<h2>Course authors</h2>
						{courseAuthorsList.length === 0 ? (
							<div>Author list is empty</div>
						) : (
							<div>
								{courseAuthorsList.map((author) => (
									<div key={author.id}>
										<div>{author.name}</div>
										<Button
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
		</>
	);
}
