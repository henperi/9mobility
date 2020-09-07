import React from 'react';
import { Styles } from './styles';

export const Spinner: React.FC<{
  isFixed?: boolean;
  size?: number;
}> = (props) => {
  const { isFixed = false, size = 50 } = props;
  return <Styles.Spinner isFixed={isFixed} size={size} />;
};
