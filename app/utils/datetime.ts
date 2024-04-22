import { DateTime } from 'luxon';

// Time is in "9:30 AM" format
export const TIMESTRING_FORMAT = 'h:mm a';

export const dateAsHumanString = (webDate: string) => {
	// just Today, Yesterday, or the date
	const today = DateTime.local().startOf('day');
	const yesterday = today.minus({ days: 1 });
	const date = DateTime.fromISO(webDate).startOf('day').toJSDate();
	if (date >= today.toJSDate()) {
		return 'Today';
	}
	if (date >= yesterday.toJSDate()) {
		return 'Yesterday';
	}
	return DateTime.fromJSDate(date).toFormat('MMMM d');
};