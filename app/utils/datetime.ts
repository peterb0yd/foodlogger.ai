import { DateTime } from "luxon";

// Time is in "9:30 AM" format
const TIME_FORMAT = 'h:mm a';
const TIMEZONE = 'America/New_York';

export const timeStringAsIso = (time: string) => DateTime.fromFormat(time, TIME_FORMAT).toJSDate().toISOString();

export const dateAsTimeString = (date: Date) => DateTime.fromJSDate(date).toFormat(TIME_FORMAT);

export const startOfIsoDate = (isoDate: string) => DateTime.fromISO(isoDate).startOf('day').toJSDate();

export const isoToLocalDate = (isoDate: string) => DateTime.fromISO(isoDate).toJSDate();

export const dateInLocalZoneIso = (date: Date) => DateTime.fromJSDate(date).setZone(TIMEZONE).toISO() as string;

export const localDateToWebString = (date: Date) => DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');