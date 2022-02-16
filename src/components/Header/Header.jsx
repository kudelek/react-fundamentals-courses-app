import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import { store } from '../../store';
import { logUserOut } from '../../store/user/actionCreators';
import { Logo } from './components/Logo/Logo';

import './Header.css';

const baseUrl = 'http://localhost:3000';

export default function Header() {
	const userName = useSelector((state) => state.user.name);
	const { isAuthenticated, setIsAuthenticated } = useAppContext();
	const history = useHistory();
	const dispatch = useDispatch();

	function handleLogout() {
		const headers = {
			Authorization: localStorage.getItem('token'),
		};

		axios
			.delete(`${baseUrl}/logout`, { headers })
			.then(() => {
				localStorage.clear();
				setIsAuthenticated(false);
				dispatch(logUserOut());
				console.log(store.getState());
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
		setIsAuthenticated(localStorage.getItem('token'));
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
