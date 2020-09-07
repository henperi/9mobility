import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Styles } from './style';
import { TopBar } from '../TopBar';
import { NavBar } from '../NavBar';
import { Row } from '../Row';
import { Column } from '../Column';

export const AppContainer: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <Row>
          <NavBar />
          <Column>
            <TopBar />
            {children}
          </Column>
        </Row>
      </Styles.AppContainer>
    </ThemeProvider>
  );
};
