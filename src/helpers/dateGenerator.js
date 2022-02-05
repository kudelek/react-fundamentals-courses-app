export function dateGenerator(date) {
	let x = new Date(date).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
	return x.replaceAll('/', '.');
}
