import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { selectUserName } from '../../store/selectors';
import { thunk_logUserOut } from '../../store/user/thunk';

import './Header.css';

export default function Header() {
	const userName = useSelector(selectUserName);
	const history = useHistory();
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(thunk_logUserOut(history));
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
					<span className='right-item'>
						{userName === null ? 'null' : userName}
					</span>
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
