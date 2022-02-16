import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { store } from '../../store';
import { logUserIn } from '../../store/user/actionCreators';

import './Login.css';

const baseUrl = 'http://localhost:3000';

export default function Login() {
	const [user, setUser] = useState({ email: '', password: '' });
	const { setIsAuthenticated } = useAppContext();
	const history = useHistory();
	const dispatch = useDispatch();

	function handleLogin(e) {
		e.preventDefault();

		axios
			.post(`${baseUrl}/login`, user)
			.then((response) => {
				const authKey = response.data.result;
				setIsAuthenticated(true);
				dispatch(
					logUserIn({ ...user, name: response.data.user.name, token: authKey })
				);
				history.push('/courses');
			})
			.catch((e) => {
				alert(
					e.response.data.errors
						? e.response.data.errors.join('\n')
						: e.response.data.result ?? 'Something went wrong'
				);
			});
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
					id='email'
					name='email'
					labelText='Email'
					inputClassName='flex'
					placeholder='Enter email'
					value={user.email}
					onInput={handleChange}
					type='email'
					label
					required
				/>
				<Input
					id='password'
					name='password'
					labelText='Password'
					inputClassName='flex'
					placeholder='Enter password'
					value={user.password}
					onInput={handleChange}
					type='password'
					label
					required
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
