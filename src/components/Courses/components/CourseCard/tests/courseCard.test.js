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

test('CourseCard should display all course details in correct format', () => {
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
	expect(screen.queryByText('JavaScript')).toBeInTheDocument();
	expect(
		screen.queryByText(
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
		)
	).toBeInTheDocument();
	expect(screen.queryByText('2:40 hours')).toBeInTheDocument();
	expect(screen.queryByText('Vasiliy Dobkin, Nicolas Kim')).toBeInTheDocument();
	expect(screen.queryByText('8.3.2021')).toBeInTheDocument();
});
