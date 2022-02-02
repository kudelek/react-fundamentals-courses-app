export function getAuthors(authorsIds, authorsList) {
	return authorsList
		.filter((author) => authorsIds.includes(author.id))
		.map((author) => author.name)
		.join(', ');
}
