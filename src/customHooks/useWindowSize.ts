import { useLayoutEffect, useState } from 'react';

/**
 * This is a custom hook that listens for window screen size updates
 *
 * @returns size - an object containing the width and height of the screen
 */
export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { width: size[0], height: size[1] };
}
