import { addAuthor, getAuthors } from '../../services';
import { store_getAuthors } from './actionCreators';

export const thunk_getAuthors = () => async (dispatch) => {
	await getAuthors().then((response) =>
		dispatch(store_getAuthors(response.data.result))
	);
};

export const thunk_addAuthor = (author) => async (dispatch) => {
	await addAuthor(author, localStorage.getItem('token')).then(() => {
		dispatch(thunk_getAuthors());
	});
};
