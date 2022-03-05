import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { mockedAuthorsList, mockedCoursesList } from '../../../constants';
import CourseForm from '../CourseForm';

const mockedState_C_A = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'test',
		role: 'admin',
	},
	courses: [mockedCoursesList[0]],
	authors: mockedAuthorsList,
};

const mockedStore_C_A = {
	getState: () => mockedState_C_A,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('CourseForm component tests', () => {
	it('should show authors lists (all and course authors)', () => {
		render(
			<Provider store={mockedStore_C_A}>
				<Router exact path='/courses/add'>
					<CourseForm />
				</Router>
			</Provider>
		);
		const input = screen.queryByTestId('author-to-be-created');

		expect(screen.queryAllByTestId('author')).toHaveLength(
			mockedAuthorsList.length
		);
		expect(screen.queryAllByTestId('course-author')).toHaveLength(0);
		expect(screen.queryByTestId('author-to-be-created').value).toMatch('');

		fireEvent.input(input, {
			target: { value: 'John Smith' },
		});
		expect(screen.queryByTestId('author-to-be-created').value).toMatch(
			'John Smith'
		);

		fireEvent.click(screen.getByTestId('create-author'));
		expect(mockedStore_C_A.dispatch).toHaveBeenCalledTimes(2);
	});

	it(`'Create author' button click should call dispatch`, () => {
		render(
			<Provider store={mockedStore_C_A}>
				<Router exact path='/courses/add'>
					<CourseForm />
				</Router>
			</Provider>
		);
		const input = screen.queryByTestId('author-to-be-created');

		expect(screen.queryByTestId('author-to-be-created').value).toMatch('');

		fireEvent.input(input, {
			target: { value: 'John Smith' },
		});
		expect(screen.queryByTestId('author-to-be-created').value).toMatch(
			'John Smith'
		);

		expect(mockedStore_C_A.dispatch).toHaveBeenCalledTimes(1);
		fireEvent.click(screen.getByTestId('create-author'));
		expect(mockedStore_C_A.dispatch).toHaveBeenCalledTimes(2);
	});

	it(`'Add author' button click should add an author to course author list`, () => {
		render(
			<Provider store={mockedStore_C_A}>
				<Router exact path='/courses/add'>
					<CourseForm />
				</Router>
			</Provider>
		);

		expect(screen.queryAllByTestId('author')).toHaveLength(
			mockedAuthorsList.length
		);
		expect(screen.queryAllByTestId('course-author')).toHaveLength(0);

		fireEvent.click(screen.queryAllByTestId('add-course-author')[0]);

		expect(screen.queryAllByTestId('author')).toHaveLength(
			mockedAuthorsList.length - 1
		);
		expect(screen.queryAllByTestId('course-author')).toHaveLength(1);
	});

	it(`'Delete author' button click should remove an author from course author list`, () => {
		render(
			<Provider store={mockedStore_C_A}>
				<Router exact path='/courses/add'>
					<CourseForm />
				</Router>
			</Provider>
		);

		expect(screen.queryAllByTestId('author')).toHaveLength(
			mockedAuthorsList.length
		);
		expect(screen.queryAllByTestId('course-author')).toHaveLength(0);

		fireEvent.click(screen.queryAllByTestId('add-course-author')[0]);
		fireEvent.click(screen.queryAllByTestId('add-course-author')[0]);
		expect(screen.queryAllByTestId('course-author')).toHaveLength(2);

		fireEvent.click(screen.queryAllByTestId('remove-course-author')[0]);

		expect(screen.queryAllByTestId('author')).toHaveLength(
			mockedAuthorsList.length - 1
		);
		expect(screen.queryAllByTestId('course-author')).toHaveLength(1);
	});
});
