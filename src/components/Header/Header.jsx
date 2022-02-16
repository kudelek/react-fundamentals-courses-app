import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import { logOut } from '../../services';
import { store } from '../../store';
import { logUserOut } from '../../store/user/actionCreators';
import { Logo } from './components/Logo/Logo';

import './Header.css';

export default function Header() {
	const userName = useSelector((state) => state.user.name);
	const { isAuthenticated, setIsAuthenticated } = useAppContext();
	const history = useHistory();
	const dispatch = useDispatch();

	function handleLogout() {
		const token = localStorage.getItem('token');

		logOut(token).then(() => {
			localStorage.clear();
			setIsAuthenticated(false);
			dispatch(logUserOut());
			console.log(store.getState());
			history.push('/login');
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
