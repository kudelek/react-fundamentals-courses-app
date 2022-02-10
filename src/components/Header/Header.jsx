import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import './Header.css';

const baseUrl = 'http://localhost:3000';

export default function Header() {
	const [userName, setUserName] = useState('');
	const { isAuthenticated, setIsAuthenticated } = useAppContext();

	const history = useHistory();

	function handleLogout() {
		const headers = {
			Authorization: localStorage.getItem('authKey'),
		};

		axios
			.delete(`${baseUrl}/logout`, { headers })
			.then(() => {
				localStorage.removeItem('authKey');
				localStorage.removeItem('userName');
				setIsAuthenticated(false);
				history.push('/login');
			})
			.catch((e) => {
				alert(
					e.response.data.errors
						? e.response.data.errors.join('\n')
						: e.response.data.result ?? 'Something went wrong'
				);
			});
	}

	useEffect(() => {
		setUserName(localStorage.getItem('userName'));
		setIsAuthenticated(localStorage.getItem('authKey'));
	});

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
