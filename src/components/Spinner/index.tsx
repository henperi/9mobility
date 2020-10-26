import React from 'react';
import { Styles } from './styles';

import igniteLogo from '../../assets/images/ig9ite logo_main.png';
import { rem } from '../../utils/rem';

export const Spinner: React.FC<{
  isFixed?: boolean;
  size?: number;
  withLogo?: boolean;
}> = (props) => {
  const { isFixed = false, size = 50, withLogo, children } = props;
  return (
    <Styles.Spinner isFixed={isFixed} size={size}>
      {withLogo && (
        <img
          src={igniteLogo}
          alt="appLogoBig"
          style={{ marginLeft: rem(20), maxWidth: '100%', width: rem(80) }}
        />
      )}
      {children}
    </Styles.Spinner>
  );
};
