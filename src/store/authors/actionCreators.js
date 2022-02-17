import {
	ADD_COURSE_AUTHOR,
	CREATE_AUTHOR,
	REMOVE_COURSE_AUTHOR,
	SAVE_AUTHORS,
} from './actionTypes';

export const saveAuthors = (authors) => ({
	type: SAVE_AUTHORS,
	payload: authors,
});

export const createAuthor = (author) => ({
	type: CREATE_AUTHOR,
	payload: author,
});

export const addAuthor = (author) => ({
	type: ADD_COURSE_AUTHOR,
	payload: author,
});

export const removeAuthor = (id) => ({
	type: REMOVE_COURSE_AUTHOR,
	payload: id,
});
