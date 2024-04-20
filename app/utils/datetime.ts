import { DateTime } from 'luxon';

// Time is in "9:30 AM" format
const UI_FORMAT = 'h:mm a';
const WEB_DATE_FORMAT = 'yyyy-MM-dd';
const TIMEZONE = 'America/New_York';
const HUMAN_DAY_FORMAT = 'MMMM d';

// as ISO in UTC
export const timeStringAsIso = (time: string) => {
	return DateTime.fromFormat(time, UI_FORMAT).toUTC().toISO() as string;
};
export const startOfIsoDate = (isoDate: string) => {
	return DateTime.fromISO(isoDate).toUTC().startOf('day').toISO() as string;
};

// as Web Date in UTC
export const startOfIsoDateAsUtcDate = (isoDate: string) => {
	return DateTime.fromISO(isoDate).toUTC().startOf('day').toJSDate();
};

// as Web Date same format
export const jsDateToWebString = (date: Date) => {
	return DateTime.fromJSDate(date).toUTC().toISODate() as string;
};
export const isoAsUtcDate = (isoDate: string) => {
	return DateTime.fromISO(isoDate).toJSDate();
};

// as Web Date in local
export const dateAsTimeUIString = (date: Date) => {
	return DateTime.fromJSDate(date).toFormat(UI_FORMAT) as string;
};
export const localDateToWebString = (date: Date) => {
	return DateTime.fromJSDate(date).toFormat(WEB_DATE_FORMAT) as string;
};
export const webDateAsHumanString = (webDate: string) => {
	// just Today, Yesterday, or the date
	const today = DateTime.local().startOf('day');
	const yesterday = today.minus({ days: 1 });
	const date = DateTime.fromFormat(webDate, WEB_DATE_FORMAT).startOf('day').toJSDate();
	if (date >= today.toJSDate()) {
		return 'Today';
	}
	if (date >= yesterday.toJSDate()) {
		return 'Yesterday';
	}
	return DateTime.fromJSDate(date).toFormat(HUMAN_DAY_FORMAT);
};
