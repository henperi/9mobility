import React from 'react';
import { Styles } from './styles';

export const Column: React.FC<{}> = (props) => {
  const { children, ...rest } = props;
  return <Styles.Column {...rest}>{children}</Styles.Column>;
};
