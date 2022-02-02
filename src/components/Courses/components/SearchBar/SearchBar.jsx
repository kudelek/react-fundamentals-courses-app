import { useState } from 'react';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import './SearchBar.css';

export default function SearchBar({ setSearchQuery }) {
	const [searchInput, setSearchInput] = useState('');

	function handleChange(v) {
		setSearchInput(v);
		if (searchInput === '') setSearchQuery('');
	}

	function handleClick() {
		setSearchQuery(searchInput);
	}

	function resetInput() {
		setSearchInput('');
		setSearchQuery('');
	}

	return (
		<div className='search-bar'>
			<Input
				className='search-input'
				labelText='Search for courses: '
				placeholderText='Enter course name...'
				onInput={(e) =>
					e.target.value === '' ? resetInput() : handleChange(e.target.value)
				}
				value={searchInput}
				id='search-input'
			/>
			<Button
				className='search-button'
				buttonText='Search'
				onClick={(e) => handleClick(e)}
			/>
		</div>
	);
}
