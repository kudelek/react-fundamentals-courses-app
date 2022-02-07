import { useState } from 'react';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import './Header.css';

export default function Header() {
	// eslint-disable-next-line no-unused-vars
	const [userName, setUserName] = useState('someUserName');
	const { isAuthenticated, setIsAuthenticated } = useAppContext();
	
	return (
		<header>
			<div className='left'>
				<Logo />
				<span>Courses</span>
			</div>
			{!isAuthenticated && (
				<div className='right'>
					<span className='right-item'>{userName}</span>
					<Button
						className='right-item'
						buttonText='Logout'
						onClick={(e) => console.log(e.target.innerHTML, 'button clicked!')}
					/>
				</div>
			)}
		</header>
	);
}
