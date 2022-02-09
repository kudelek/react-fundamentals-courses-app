import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import './Header.css';

const baseUrl = 'http://localhost:3000';

export default function Header() {
	// eslint-disable-next-line no-unused-vars
	const { userName } = useAppContext();
	const { isAuthenticated, setIsAuthenticated } = useAppContext();

	const history = useHistory();

	function handleLogout() {
		// TO DO: FETCH DELETE LOGIN
		const headers = {
			Authorisation: localStorage.getItem('authKey'),
			accept: '*/*',
		};
		console.log(localStorage.getItem('authKey'));

		axios.delete(`${baseUrl}/logout`, headers).then((response) => {
			console.log(response);
		});

		// setIsAuthenticated(false);
		// history.push('/login');
	}
	return (
		<header>
			<div className='left'>
				<Logo />
				<Link to='/courses' className='home-link'>
					Courses
				</Link>
			</div>
			{isAuthenticated && (
				<div className='right'>
					<span className='right-item'>{userName}</span>
					<Button
						className='right-item'
						buttonText='Logout'
						onClick={handleLogout}
					/>
				</div>
			)}
		</header>
	);
}
