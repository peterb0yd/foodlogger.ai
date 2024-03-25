import { DateTime } from "luxon";

// Time is in "9:30 AM" format
const TIME_FORMAT = 'h:mm a';
const TIMEZONE = 'America/New_York';

export const timeStringFormatted = (time: string) => DateTime.fromFormat(time, TIME_FORMAT).setZone(TIMEZONE).toJSDate().toDateString();

export const dateAsTimeString = (date: Date) => DateTime.fromJSDate(date).setZone(TIMEZONE).toFormat(TIME_FORMAT);

export const startOfIsoDate = (isoDate: string) => DateTime.fromISO(isoDate).setZone(TIMEZONE).startOf('day').toJSDate();

export const localDateToWebString = (date: Date) => DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');