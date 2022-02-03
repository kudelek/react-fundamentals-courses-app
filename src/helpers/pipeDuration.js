export function getDuration(minutes) {
	return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? '0' : ''}${
		minutes % 60
	}`;
}
