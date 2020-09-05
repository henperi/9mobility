import React from 'react';
import { Styles } from './styles';

export const Row: React.FC<{}> = (props) => {
  const { children, ...rest } = props;
  return <Styles.Row {...rest}>{children}</Styles.Row>;
};
