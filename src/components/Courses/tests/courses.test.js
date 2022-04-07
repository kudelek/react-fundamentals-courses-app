import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { mockedAuthorsList, mockedCoursesList } from '../../../constants';
import CourseForm from '../../CourseForm/CourseForm';
import Courses from '../Courses';

const mockedState_C_A = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'test',
		role: 'admin',
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const mockedStore_C_A = {
	getState: () => mockedState_C_A,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedState_NoC_A = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'test',
		role: 'admin',
	},
	courses: [],
	authors: mockedAuthorsList,
};

const mockedStore_NoC_A = {
	getState: () => mockedState_NoC_A,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Courses component tests', () => {
	it('should display amount of CourseCard equal length of courses array', () => {
		render(
			<Provider store={mockedStore_C_A}>
				<Courses />
			</Provider>
		);
		expect(screen.queryAllByTestId('course-card')).toHaveLength(
			mockedCoursesList.length
		);
	});

	it("should display Empty container with 'There are no courses' text if courses array length is 0", () => {
		render(
			<Provider store={mockedStore_NoC_A}>
				<Courses />
			</Provider>
		);
		expect(screen.queryByTestId('no-courses')).toBeInTheDocument();
		expect(screen.queryAllByTestId('course-card')).toHaveLength(0);
	});

	it("should redirect to CourseForm after a click on a button 'Add new course'", () => {
		render(
			<Provider store={mockedStore_NoC_A}>
				<Router>
					<Switch>
						<Courses exact path='/' />
						<CourseForm exact path='/courses/add' />
					</Switch>
				</Router>
			</Provider>
		);

		expect(screen.queryByTestId('add-course')).toBeInTheDocument();
		expect(screen.getByTestId('add-course')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('add-course'));

		const form = screen.getByTestId('course-form');

		expect(form).toBeInTheDocument();
	});
});
