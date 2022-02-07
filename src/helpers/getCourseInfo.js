import { getDuration } from './pipeDuration';
import { dateGenerator } from './dateGenerator';
import { getAuthors } from './getAuthors';
import { mockedAuthorsList } from '../constants';

export function getCourseInfo(props) {
	const authorsList = mockedAuthorsList;
	return [
		['Authors: ', getAuthors(props.authors, authorsList)],
		['Duration: ', `${getDuration(props.duration)} hours`],
		['Created: ', dateGenerator(props.creationDate)],
	];
}
