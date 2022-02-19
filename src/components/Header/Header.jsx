import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { logOut } from '../../services';
import { selectUserName } from '../../store/selectors';
import { logUserOut } from '../../store/user/actionCreators';

import './Header.css';

export default function Header() {
	const userName = useSelector(selectUserName);
	const history = useHistory();
	const dispatch = useDispatch();

	function handleLogout() {
		const token = localStorage.getItem('token');

		logOut(token).then(() => {
			localStorage.clear();
			dispatch(logUserOut());
			history.push('/login');
		});
	}

	return (
		<header>
			<div className='left'>
				<Logo />
				<Link to='/courses' className='home-link'>
					Courses
				</Link>
			</div>
			{!!localStorage.getItem('token') && (
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
