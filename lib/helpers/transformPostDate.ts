export function transformPostDate(postDate: number) {
	const now = Math.floor(Date.now() / 1000);
	const seconds = now - Math.floor(postDate / 1000);

	if (seconds < 60) {
		return seconds + 's ago';
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return minutes + (minutes === 1 ? 'min ago' : 'min ago');
	} else if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return hours + (hours === 1 ? 'h ago' : 'h ago');
	} else if (seconds < 604800) {
		const days = Math.floor(seconds / 86400);
		return days + (days === 1 ? ' day ago' : ' days ago');
	} else if (seconds < 2419200) {
		const weeks = Math.floor(seconds / 604800);
		return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
	} else {
		const date = new Date(postDate);
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const day = date.getDate();
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();

		if (year === new Date().getFullYear()) {
			return month + ' ' + day;
		} else {
			return month + ' ' + day + ', ' + year;
		}
	}
}
