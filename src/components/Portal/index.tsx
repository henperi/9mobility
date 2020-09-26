import React, { useEffect } from 'react';

import { createPortal } from 'react-dom';

const flyoutRoot = document.getElementById('flyout-portal');

export const Portal: React.FC<{ width?: string }> = (props) => {
  const { children, width } = props;

  const el = document.createElement('div');

  useEffect(() => {
    // append to root when the children of Flyout are mounted
    flyoutRoot && flyoutRoot.appendChild(el);

    // do a cleanup
    return () => {
      flyoutRoot && flyoutRoot.removeChild(el);
    };
  }, [el]);

  return createPortal(
    <div style={{ position: 'absolute', top: 0, left: 0, width }}>
      {children}
    </div>,
    flyoutRoot as HTMLElement,
  );
};
