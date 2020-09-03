import React from 'react';
import { Styles } from './styles';

export const PageBody: React.FC<{
  centeralize?: boolean;
}> = (props) => {
  const { children, centeralize = false } = props;
  return <Styles.PageBody centeralize={centeralize}>{children}</Styles.PageBody>;
};
