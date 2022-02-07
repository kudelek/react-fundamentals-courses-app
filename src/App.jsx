import { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';

import './App.css';
import { AppContext } from './AppContext';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<div className='App'>
				<AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			<Header />
			<Registration />
		</div>
				</AppContext.Provider>
	);
}

export default App;
