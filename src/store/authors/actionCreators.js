import { SAVE_AUTHOR, GET_AUTHORS } from './actionTypes';

export const getAuthors = (authors) => ({
	type: GET_AUTHORS,
	payload: authors,
});

export const createAuthor = (author) => ({
	type: SAVE_AUTHOR,
	payload: author,
});
