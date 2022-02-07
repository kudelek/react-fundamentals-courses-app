import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import './Registration.css';

export default function Registration() {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const history = useHistory();

	function handleRegister() {
		if (userName.length < 2) {
			alert('User name should be at least 2 characters long');
			return;
		}
		// TO DO: EMAIL VALIDATION
		if (userPassword.length < 2) {
			alert('User password should be at least 2 characters long');
			return;
		}
		history.push('./login');
	}

	return (
		<div className='container'>
			<form className='form'>
				<h2>Registration</h2>
				<Input
					id='name'
					labelText='Name'
					labelClassName='label'
					placeholder='Enter name'
					value={userName}
					onInput={(e) => setUserName(e.target.value)}
				/>
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
				<Button
					className='button'
					buttonText='Registration'
					onClick={handleRegister}
				/>
				<div className='bottom-text'>
					If you have an account you can <Link to='/login'>Login</Link>
				</div>
			</form>
		</div>
	);
}
