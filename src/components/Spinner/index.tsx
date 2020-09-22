import React from 'react';
import { Styles } from './styles';

import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';

export const Spinner: React.FC<{
  isFixed?: boolean;
  size?: number;
  withLogo?: boolean;
}> = (props) => {
  const { isFixed = false, size = 50, withLogo, children } = props;
  return (
    <Styles.Spinner isFixed={isFixed} size={size}>
      {withLogo && <Logo style={{ width: '100%' }} />}
      {children}
    </Styles.Spinner>
  );
};
