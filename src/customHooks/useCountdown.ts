import { useState, useEffect } from 'react';

export const useCountdown = (timeInSeconds: number) => {
  const [time, setTime] = useState(timeInSeconds);

  useEffect(() => {
    setTime(timeInSeconds);
  }, [timeInSeconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        }

        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeInSeconds]);

  return time;
};
