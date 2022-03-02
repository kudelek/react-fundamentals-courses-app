import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'test',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test("Header should have logo and user's name", () => {
	render(
		<Router>
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		</Router>
	);
	expect(screen.queryByText('Test Name')).toBeInTheDocument();
	expect(screen.queryByAltText('courses')).toBeInTheDocument();
});
