import React from 'react';
import { Styles } from './styles';

export const Card: React.FC<{
  padding?: boolean;
  margin?: number;
}> = (props) => {
  const { children } = props;
  return <Styles.Card showOverlayedDesign>{children}</Styles.Card>;
};
