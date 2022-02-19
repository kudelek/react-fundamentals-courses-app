import { CREATE_AUTHOR, SAVE_AUTHORS } from './actionTypes';

export const saveAuthors = (authors) => ({
	type: SAVE_AUTHORS,
	payload: authors,
});

export const createAuthor = (author) => ({
	type: CREATE_AUTHOR,
	payload: author,
});
