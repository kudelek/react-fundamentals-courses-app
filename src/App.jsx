import { useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Courses from './components/Courses/Courses';

import './App.css';
import { AppContext } from './AppContext';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<div className='App'>
			<Router>
				<AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
					<Header />
					<Switch>
						<Route exact path='/login'>
							<Login />
						</Route>
						<Route exact path='/courses/:courseId'>
							<CourseInfo />
						</Route>
						<Route exact path='/registration'>
							<Registration />
						</Route>
						<Route exact path='/courses/add'>
							<CreateCourse />
						</Route>
						<Route exact path='/courses'>
							<Courses />
						</Route>
					</Switch>
				</AppContext.Provider>
			</Router>
		</div>
	);
}

export default App;
