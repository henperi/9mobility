import { DateTime } from 'luxon';

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
