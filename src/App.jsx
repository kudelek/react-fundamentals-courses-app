import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Courses from './components/Courses/Courses';

import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Routes/UnauthenticatedRoute';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';

import { thunk_getUser } from './store/user/thunk';

import './App.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(thunk_getUser());
		}
	}, [dispatch]);

	return (
		<div className='App'>
			<Router>
				<Header />
				<Switch>
					<UnauthenticatedRoute exact path='/login'>
						<Login />
					</UnauthenticatedRoute>
					<UnauthenticatedRoute exact path='/registration'>
						<Registration />
					</UnauthenticatedRoute>
					<PrivateRoute exact path='/courses/add'>
						<AuthenticatedRoute>
							<CourseForm />
						</AuthenticatedRoute>
					</PrivateRoute>
					<PrivateRoute exact path='/courses/update/:courseId'>
						<AuthenticatedRoute>
							<CourseForm edit />
						</AuthenticatedRoute>
					</PrivateRoute>
					<AuthenticatedRoute exact path='/courses/:courseId'>
						<CourseInfo />
					</AuthenticatedRoute>
					<AuthenticatedRoute exact path='/courses'>
						<Courses />
					</AuthenticatedRoute>
					<Redirect from='/' to='/login' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
