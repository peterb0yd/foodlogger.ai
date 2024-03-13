import { DateTime } from "luxon";

// Time is in "9:30 AM" format
const TIME_FORMAT = 'h:mm a';

export const timeStringAsDateISO = (time: string) => DateTime.fromFormat(time, TIME_FORMAT).toISO() as string;

export const dateAsTimeString = (date: Date) => DateTime.fromJSDate(date).toFormat(TIME_FORMAT);