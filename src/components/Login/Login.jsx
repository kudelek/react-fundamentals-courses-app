import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import './Login.css';

export default function Login() {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	function handleLogin() {
		// TO DO: EMAIL VALIDATION
		if (userPassword.length < 2) {
			alert('User password should be at least 2 characters long');
			return;
		}
	}

	return (
		<div className='container'>
			<form className='form'>
				<h2>Login</h2>
				<Input
					labelText='Email'
					labelClassName='label'
					placeholder='Enter email'
					value={userEmail}
					onInput={(e) => setUserEmail(e.target.value)}
				/>
				<Input
					labelText='Password'
					labelClassName='label'
					placeholder='Enter password'
					value={userPassword}
					onInput={(e) => setUserPassword(e.target.value)}
				/>
				<Button className='button' buttonText='Login' onClick={handleLogin} />
				<div className='bottom-text'>
					If you don't have an account you can{' '}
					<Link to='/registration'>Register</Link>
				</div>
			</form>
		</div>
	);
}
