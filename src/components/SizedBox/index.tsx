import React from 'react';
import { Styles } from './styles';

export const SizedBox: React.FC<{
  height?: number;
  width?: number;
}> = (props) => {
  const { children, ...rest } = props;
  return <Styles.SizedBox {...rest} >{children}</Styles.SizedBox>;
};
