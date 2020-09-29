import { useEffect } from 'react';

/**
 * This hook calls the callback at the provided future date
 *
 * @param date - the future date to run the callback
 * @param callback - the callback
 * @returns size - an object containing the width and height of the screen
 */
export function useTimeoutCallback(
  date: string | number | Date,
  callback: () => void,
) {
  useEffect(() => {
    const milisecondsUntilDate = new Date(date).getTime() - Date.now();

    const timeOut = setTimeout(() => {
      if (milisecondsUntilDate < 0) return;
      callback();
    }, milisecondsUntilDate);

    return () => {
      clearTimeout(timeOut);
    };
  }, [date, callback]);
}
