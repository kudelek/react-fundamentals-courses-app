import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockedAuthorsList, mockedCoursesList } from '../../../../../constants';
import CourseCard from '../CourseCard';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'test',
	},
	courses: [],
	authors: mockedAuthorsList,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const course = mockedCoursesList[0];

test('should display all course details in correct format', () => {
	render(
		<Provider store={mockedStore}>
			<CourseCard
				key={course.id}
				id={course.id}
				title={course.title}
				description={course.description}
				authors={course.authors}
				duration={course.duration}
				creationDate={course.creationDate}
			/>
		</Provider>
	);
	expect(screen.queryByTestId('title')).toBeInTheDocument();
	expect(screen.queryByTestId('description')).toBeInTheDocument();
	expect(screen.queryByTestId('duration')).toBeInTheDocument();
	expect(screen.queryByTestId('authors')).toBeInTheDocument();
	expect(screen.queryByTestId('created')).toBeInTheDocument();
});
