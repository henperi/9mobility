import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Styles } from './style';
import { TopBar } from '../TopBar';
import { NavBar } from '../NavBar';
import { Row } from '../Row';
import { Column } from '../Column';
import { useGlobalStore } from '../../store';

export const AppContainer: React.FC = ({ children }) => {
  const { state } = useGlobalStore();
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <Row>
          {state.auth.isAuthenticated && <NavBar />}
          <Column>
            <TopBar />
            {children}
          </Column>
        </Row>
      </Styles.AppContainer>
    </ThemeProvider>
  );
};
