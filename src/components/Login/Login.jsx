import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import './Login.css';

const baseUrl = 'http://localhost:3000';

export default function Login() {
	const { setUserName } = useAppContext();
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const { setIsAuthenticated } = useAppContext();
	const history = useHistory();

	function handleLogin(e) {
		e.preventDefault();

		const data = { email: userEmail, password: userPassword };

		axios
			.post(`${baseUrl}/login`, data)
			.then((response) => {
				const authKey = response.data.result;
				console.log(authKey);
				setIsAuthenticated(true);
				localStorage.setItem('authKey', authKey);
				setUserName(response.data.user.name);
				history.push('/courses');
			})
			.catch((e) => alert(e.response.data.errors.join('\n')));
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
				<Button
					className='button'
					buttonText='Login'
					onClick={(e) => handleLogin(e)}
				/>
				<div className='bottom-text'>
					If you don't have an account you can{' '}
					<Link to='/registration'>Register</Link>
				</div>
			</form>
		</div>
	);
}
