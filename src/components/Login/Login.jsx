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
	const [user, setUser] = useState({ email: '', password: '' });
	const { setIsAuthenticated } = useAppContext();
	const history = useHistory();

	function handleLogin(e) {
		e.preventDefault();

		axios
			.post(`${baseUrl}/login`, user)
			.then((response) => {
				const authKey = response.data.result;
				setIsAuthenticated(true);
				localStorage.setItem('authKey', authKey);
				localStorage.setItem('userName', response.data.user.name);
				history.push('/courses');
			})
			.catch((e) => alert(e.response.data.errors.join('\n')));
	}

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	}

	return (
		<div className='container'>
			<form className='form' onSubmit={handleLogin}>
				<h2>Login</h2>
				<Input
					name='email'
					labelText='Email'
					labelClassName='login-label'
					inputClassName='flex'
					placeholder='Enter email'
					value={user.email}
					onInput={handleChange}
					type='email'
				/>
				<Input
					name='password'
					labelText='Password'
					labelClassName='label'
					inputClassName='flex'
					placeholder='Enter password'
					value={user.password}
					onInput={handleChange}
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
