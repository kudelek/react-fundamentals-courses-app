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

test('Courses should display amount of CourseCard equal length of courses array', () => {
	render(
		<Provider store={mockedStore_C_A}>
			<Courses />
		</Provider>
	);
	expect(screen.queryAllByTitle('courseCard')).toHaveLength(
		mockedCoursesList.length
	);
});

test("Courses should display Empty container with 'There are no courses' text if courses array length is 0", () => {
	render(
		<Provider store={mockedStore_NoC_A}>
			<Courses />
		</Provider>
	);
	expect(screen.queryByText('There are no courses')).toBeInTheDocument();
	expect(screen.queryAllByTitle('courseCard')).toHaveLength(0);
});

test("CourseForm should be showed after a click on a button 'Add new course'", () => {
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

	expect(screen.queryByText('Add new course')).toBeInTheDocument();
	expect(
		screen.getByRole('button', { name: 'Add new course' })
	).toBeInTheDocument();
	fireEvent.click(screen.getByRole('button', { name: 'Add new course' }));

	const form = screen.getByTitle('courseForm');

	expect(form).toBeInTheDocument();
});
