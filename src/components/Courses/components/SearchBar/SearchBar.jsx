import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import './SearchBar.css';

export default function SearchBar({ setSearchQuery }) {
	const [searchInput, setSearchInput] = useState('');

	function handleChange(value) {
		setSearchInput(value);
		if (!value) setSearchQuery('');
	}

	function handleClick() {
		setSearchQuery(searchInput);
	}

	return (
		<div className='search-bar'>
			<Input
				className='search-input'
				labelText='Search for courses: '
				placeholder='Enter course name...'
				onInput={(e) => handleChange(e.target.value)}
				value={searchInput}
				id='search-input'
			/>
			<Button
				className='search-button'
				buttonText='Search'
				onClick={handleClick}
			/>
		</div>
	);
}

SearchBar.propTypes = {
	setSearchQuery: PropTypes.func,
};
