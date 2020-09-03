import React from 'react';
import { Styles } from './style';

export const AppContainer: React.FC = ({ children }) => {
  return <Styles.AppContainer>{children}</Styles.AppContainer>;
};
