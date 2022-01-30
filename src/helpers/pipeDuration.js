export function getDuration(minutes) {
	return `${Math.floor(minutes / 60)}:${minutes % 60} hours`;
}
