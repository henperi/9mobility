import React from 'react';
import { Styles } from './styles';
import { Text } from '../Text';

export const SuccessBox: React.FC<
  {
    height?: number;
    width?: number;
  } & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children, ...rest } = props;
  return (
    <Styles.SuccessBox {...rest}>
      <Text size={14}>{children}</Text>
    </Styles.SuccessBox>
  );
};
