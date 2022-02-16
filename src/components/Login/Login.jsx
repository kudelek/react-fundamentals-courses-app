import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { logIn } from '../../services';
import { logUserIn } from '../../store/user/actionCreators';

export default function Login() {
	const [user, setUser] = useState({ email: '', password: '' });
	const { setIsAuthenticated } = useAppContext();
	const history = useHistory();
	const dispatch = useDispatch();

	function handleLogin(e) {
		e.preventDefault();

		logIn(user).then((response) => {
			const token = response.data.result;
			const name = response.data.user.name;
			setIsAuthenticated(true);
			localStorage.setItem('userName', name);
			localStorage.setItem('token', token);
			dispatch(logUserIn({ ...user, name: name, token: token }));
			history.push('/courses');
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
