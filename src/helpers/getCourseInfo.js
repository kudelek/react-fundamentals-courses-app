import { getDuration } from './pipeDuration';
import { dateGenerator } from './dateGenerator';
import { getAuthors } from './getAuthors';

export function getCourseInfo(props, authorsList, params) {
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
			param: 'creationDate',
			content: ['Created: ', dateGenerator(props.creationDate)],
		},
		{ param: 'id', content: ['ID: ', props.id] },
	];
	return params.map(
		(p) => courseInfoListOptions.find((info) => info.param === p).content
	);
}
