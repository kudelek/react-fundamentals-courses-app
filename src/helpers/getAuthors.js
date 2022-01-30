export function getAuthors(authorsIds, authorsList) {
	let authors = [];
	for (let authorId of authorsIds) {
		for (let author of authorsList) {
			if (author.id === authorId) authors.push(author.name);
		}
	}
	return authors.join(', ');
}
