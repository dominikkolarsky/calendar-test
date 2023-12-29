import { format, utcToZonedTime } from 'date-fns-tz';
import { isSameDay, isSameMonth } from 'date-fns';

export const formatDateTimeTz = (date: Date, dateFormat: string, timeZone: string = 'America/New_York') => {
  const dateInTimeZone = utcToZonedTime(date, timeZone);

  return format(dateInTimeZone, dateFormat, { timeZone });
};

export const isSameDayTz = (a: Date, toConvert: Date, timeZone: string = 'America/New_York') => {
  return isSameDay(a, utcToZonedTime(toConvert, timeZone));
};

export const isSameMonthTz = (a: Date, toConvert: Date, timeZone: string = 'America/New_York') => {
  return isSameMonth(a, utcToZonedTime(toConvert, timeZone));
};

export const isSameOrNewerMonth = (a: Date, b: Date) => {
  return a.getFullYear() > b.getFullYear() || (a.getFullYear() >= b.getFullYear() && a.getMonth() >= b.getMonth());
};

export const isSameOrOlderMonth = (a: Date, b: Date) => {
  return a.getFullYear() < b.getFullYear() || (a.getFullYear() <= b.getFullYear() && a.getMonth() <= b.getMonth());
};
