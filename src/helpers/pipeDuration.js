export function getDuration(minutes) {
	return isNaN(minutes) || +minutes <= 0
		? '0:00'
		: `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? '0' : ''}${
				minutes % 60
		  }`;
}
