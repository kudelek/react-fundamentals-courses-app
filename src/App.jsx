import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Courses from './components/Courses/Courses';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Routes/UnauthenticatedRoute';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Switch>
					<UnauthenticatedRoute exact path='/login'>
						<Login />
					</UnauthenticatedRoute>
					<AuthenticatedRoute exact path='/courses/add'>
						<CourseForm />
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
			</Router>
		</div>
	);
}

export default App;
