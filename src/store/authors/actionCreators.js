import { SAVE_AUTHOR, GET_AUTHORS } from './actionTypes';

export const store_getAuthors = (authors) => ({
	type: GET_AUTHORS,
	payload: authors,
});

export const store_addAuthor = (author) => ({
	type: SAVE_AUTHOR,
	payload: author,
});
