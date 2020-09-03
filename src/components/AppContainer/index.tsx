import React from 'react';
import { Styles } from './style';
import { ThemeProvider } from 'styled-components';

export const AppContainer: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>{children}</Styles.AppContainer>
    </ThemeProvider>
  );
};
