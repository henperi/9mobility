import React from 'react';
import { Styles } from './styles';

export const Text: React.FC<{
  size?: number;
  variant?: 'darker' | 'lighter' | 'white' | undefined;
  color?: string;
}> = (props) => {
  const { children, ...rest } = props;
  return <Styles.Text {...rest} >{children}</Styles.Text>;
};
