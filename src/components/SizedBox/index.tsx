import React from 'react';
import { Styles } from './styles';

export type ISizedBox = {
  height?: number;
  width?: number;
  percent?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const SizedBox: React.FC<ISizedBox> = (props) => {
  const { children, ...rest } = props;
  return <Styles.SizedBox {...rest}>{children}</Styles.SizedBox>;
};
