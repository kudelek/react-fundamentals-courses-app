import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import './Registration.css';

const baseUrl = 'http://localhost:3000';

export default function Registration() {
	const history = useHistory();
	const [user, setUser] = useState({ name: '', email: '', password: '' });

	function handleRegister(e) {
		e.preventDefault();

		axios
			.post(`${baseUrl}/register`, user)
			.then((response) => {
				alert(`Hooray! ${response.data.result}`);
				history.push('./login');
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
			<form className='form' onSubmit={handleRegister}>
				<h2>Registration</h2>
				<Input
					name='name'
					labelText='Name'
					inputClassName='flex'
					placeholder='Enter name'
					value={user.name}
					onInput={handleChange}
					label
				/>
				<Input
					name='email'
					labelText='Email'
					inputClassName='flex'
					placeholder='Enter email'
					value={user.email}
					onInput={handleChange}
					type='email'
					label
				/>
				<Input
					name='password'
					labelText='Password'
					inputClassName='flex'
					placeholder='Enter password'
					value={user.password}
					onInput={handleChange}
					type='password'
					label
				/>
				<Button className='button' buttonText='Registration' />
				<div className='bottom-text'>
					If you have an account you can <Link to='/login'>Login</Link>
				</div>
			</form>
		</div>
	);
}
