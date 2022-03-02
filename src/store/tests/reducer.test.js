import { store, rootReducer } from '../';

import { mockedAuthorsList, mockedCoursesList } from '../../constants';

const storeInitialState = {
	user: {
		isAuth: '',
		name: '',
		email: '',
		token: '',
		role: '',
	},
	courses: [],
	authors: [],
};

test('should return the initial state', () => {
	expect(store.getState()).toEqual(storeInitialState);
});

test('reducer should handle GET_COURSES and returns new state', () => {
	const courses = rootReducer(storeInitialState, {
		type: 'GET_COURSES',
		payload: mockedCoursesList,
	});
	expect(courses).toEqual({
		...storeInitialState,
		courses: mockedCoursesList,
	});
});

test('reducer should handle SAVE_COURSE and returns new state', () => {
	const courses = rootReducer(storeInitialState, {
		type: 'SAVE_COURSE',
		payload: mockedCoursesList[0],
	});
	expect(courses).toEqual({
		...storeInitialState,
		courses: [...storeInitialState.courses, mockedCoursesList[0]],
	});
});

test('should get authors', () => {
	const authors = rootReducer(storeInitialState, {
		type: 'GET_AUTHORS',
		payload: mockedAuthorsList,
	});
	expect(authors).toEqual({ ...storeInitialState, authors: mockedAuthorsList });
});
