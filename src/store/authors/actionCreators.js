import { GET_AUTHORS } from './actionTypes';

export const store_getAuthors = (authors) => ({
	type: GET_AUTHORS,
	payload: authors,
});
