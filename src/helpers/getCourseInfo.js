import { getDuration } from './pipeDuration';
import { dateGenerator } from './dateGenerator';
import { getAuthors } from './getAuthors';
import { mockedAuthorsList } from '../constants';

export function getCourseInfo(props, params) {
	const authorsList = mockedAuthorsList;
	const courseInfoListOptions = [
		{
			param: 'authors',
			content: ['Authors: ', getAuthors(props.authors, authorsList)],
		},
		{
			param: 'duration',
			content: ['Duration: ', `${getDuration(props.duration)} hours`],
		},
		{
			param: 'created',
			content: ['Created: ', dateGenerator(props.creationDate)],
		},
		{ param: 'id', content: ['ID: ', props.id] },
	];
	const courseInfo = params.map(
		(p) => courseInfoListOptions.filter((info) => info.param === p)[0].content
	);
	return courseInfo;
}
