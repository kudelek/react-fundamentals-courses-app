import { useState } from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Courses from './components/Courses/Courses';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Routes/UnauthenticatedRoute';
import { AppContext } from './AppContext';

import { mockedCoursesList } from './constants';
import './App.css';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('authKey')
	);
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	return (
		<div className='App'>
			<Router>
				<AppContext.Provider
					value={{
						isAuthenticated,
						setIsAuthenticated,
						coursesList,
						setCoursesList,
					}}
				>
					<Header />
					<Switch>
						<UnauthenticatedRoute exact path='/login'>
							<Login />
						</UnauthenticatedRoute>
						<AuthenticatedRoute exact path='/courses/add'>
							<CreateCourse />
						</AuthenticatedRoute>
						<AuthenticatedRoute exact path='/courses/:courseId'>
							<CourseInfo />
						</AuthenticatedRoute>
						<UnauthenticatedRoute exact path='/registration'>
							<Registration />
						</UnauthenticatedRoute>
						<AuthenticatedRoute exact path='/courses'>
							<Courses />
						</AuthenticatedRoute>
						<Redirect from='/' to='/login' />
					</Switch>
				</AppContext.Provider>
			</Router>
		</div>
	);
}

export default App;
