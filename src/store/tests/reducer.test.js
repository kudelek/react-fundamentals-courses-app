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

describe('reducer tests', () => {
	it('should return the initial state', () => {
		expect(store.getState()).toEqual(storeInitialState);
	});

	it('should handle GET_COURSES and returns new state', () => {
		const courses = rootReducer(storeInitialState, {
			type: 'GET_COURSES',
			payload: mockedCoursesList,
		});
		expect(courses).toEqual({
			...storeInitialState,
			courses: mockedCoursesList,
		});
	});

	it('should handle SAVE_COURSE and returns new state', () => {
		const courses = rootReducer(storeInitialState, {
			type: 'SAVE_COURSE',
			payload: mockedCoursesList[0],
		});
		expect(courses).toEqual({
			...storeInitialState,
			courses: [...storeInitialState.courses, mockedCoursesList[0]],
		});
	});

	it('should get authors', () => {
		const authors = rootReducer(storeInitialState, {
			type: 'GET_AUTHORS',
			payload: mockedAuthorsList,
		});
		expect(authors).toEqual({
			...storeInitialState,
			authors: mockedAuthorsList,
		});
	});
});
