import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Styles } from './style';
import { TopBar } from '../TopBar';
import { NavBar } from '../NavBar';
import { Row } from '../Row';
import { Column } from '../Column';
import { useGlobalStore } from '../../store';

export const AppContainer: React.FC = ({ children }) => {
  const {
    state: { auth },
  } = useGlobalStore();

  const hasValidAccess = auth.isAuthenticated && auth.user?.email;

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <Row wrap={false}>
          {Boolean(hasValidAccess) && <NavBar />}
          <Column>
            <TopBar auth={Boolean(hasValidAccess)} />
            {children}
          </Column>
        </Row>
      </Styles.AppContainer>
    </ThemeProvider>
  );
};
