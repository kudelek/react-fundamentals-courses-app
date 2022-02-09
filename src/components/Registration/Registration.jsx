import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import './Registration.css';

const baseUrl = 'http://localhost:3000';

export default function Registration() {
	const { userName, setUserName } = useAppContext();
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const history = useHistory();

	function handleRegister(e) {
		e.preventDefault();

		const data = { name: userName, email: userEmail, password: userPassword };

		axios
			.post(`${baseUrl}/register`, data)
			.then((response) => {
				alert(`Hooray! ${response.data.result}`);
				history.push('./login');
			})
			.catch((e) => alert(e.response.data.errors.join('\n')));
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
					onClick={(e) => handleRegister(e)}
				/>
				<div className='bottom-text'>
					If you have an account you can <Link to='/login'>Login</Link>
				</div>
			</form>
		</div>
	);
}
