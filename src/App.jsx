import { useState } from 'react';
import {
	Switch,
	Route,
	BrowserRouter as Router,
	Redirect,
} from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Courses from './components/Courses/Courses';
import { AppContext } from './AppContext';

import './App.css';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userName, setUserName] = useState('');

	return (
		<div className='App'>
			<Router>
				<AppContext.Provider
					value={{
						isAuthenticated,
						setIsAuthenticated,
						userName,
						setUserName,
					}}
				>
					<Header />
					<Switch>
						<Route exact path='/login'>
							<Login />
						</Route>
						<AuthenticatedRoute exact path='/courses/add'>
							<CreateCourse />
						</AuthenticatedRoute>
						<AuthenticatedRoute exact path='/courses/:courseId'>
							<CourseInfo />
						</AuthenticatedRoute>
						<Route exact path='/registration'>
							<Registration />
						</Route>
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
