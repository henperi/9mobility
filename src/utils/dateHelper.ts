import { DateTime } from 'luxon';
import { logger } from './logger';

export enum Direction {
  Back,
  Forward,
}
export const getDateFromSelected = (
  selectedDate: string,
  numOfDays: number,
  direction: Direction,
): string => {
  const dateValue = new Date(selectedDate);
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth() + 1;
  const day = dateValue.getDate();

  if (direction === Direction.Back) {
    return DateTime.local(year, month, day)
      .minus({ days: numOfDays })
      .toISODate();
  }

  return DateTime.local(year, month, day).plus({ days: numOfDays }).toISODate();
};

export const getIsoDate = (dateValue: string) => {
  const date = new Date(dateValue);

  return date.toISOString().slice(0, 10);
};

export const getDateDiff = (firstDate: string, secondDate: string) => {
  // One day Time in ms (milliseconds)
  const one_day = 1000 * 60 * 60 * 24;
  const date1 = new Date(firstDate);
  const date2 = new Date(secondDate);

  // To Calculate the result in milliseconds and then converting into days
  const Result = Math.round(date2.getTime() - date1.getTime()) / one_day;
  return Number(Result.toFixed(0));
};
