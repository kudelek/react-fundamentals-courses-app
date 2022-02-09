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
		const data = { email: userEmail, password: userPassword };

		e.preventDefault();

		axios
			.post(`${baseUrl}/login`, data)
			.then((response) => {
				const authKey = response.data.result;
				setIsAuthenticated(true);
				localStorage.setItem('authKey', authKey);
				setUserName(response.data.user.name);
				history.push('/courses');
			})
			.catch((e) => alert(e.response.data.errors.join('\n')));
	}

	return (
		<div className='container'>
			<form className='form' onSubmit={handleLogin}>
				<h2>Login</h2>
				<Input
					labelText='Email'
					labelClassName='label'
					placeholder='Enter email'
					value={userEmail}
					onInput={(e) => setUserEmail(e.target.value)}
					type='email'
				/>
				<Input
					labelText='Password'
					labelClassName='label'
					placeholder='Enter password'
					value={userPassword}
					onInput={(e) => setUserPassword(e.target.value)}
					type='password'
				/>
				<Button className='button' buttonText='Login' />
				<div className='bottom-text'>
					If you don't have an account you can{' '}
					<Link to='/registration'>Register</Link>
				</div>
			</form>
		</div>
	);
}
