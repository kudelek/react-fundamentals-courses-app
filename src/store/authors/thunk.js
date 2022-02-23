import { addAuthor, getAuthors } from '../../services';
import { store_addAuthor, store_getAuthors } from './actionCreators';

export const thunk_getAuthors = () => async (dispatch) => {
	await getAuthors().then((response) =>
		dispatch(store_getAuthors(response.data.result))
	);
};

export const thunk_addAuthor = (author, token) => async (dispatch) => {
	await addAuthor(author, token).then(() => {
		dispatch(store_addAuthor(author));
		dispatch(thunk_getAuthors());
	});
};
