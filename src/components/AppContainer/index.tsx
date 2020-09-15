import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Styles } from './style';
import { TopBar } from '../TopBar';
import { SideBar } from '../SideBar';
import { Row } from '../Row';
import { Column } from '../Column';
import { useGlobalStore } from '../../store';
import { rem } from '../../utils/rem';
import { useScreenSize } from '../../customHooks/useScreenSize';
import { ScreenSizes } from '../Column/styles';

export const AppContainer: React.FC = ({ children }) => {
  const {
    state: { auth },
  } = useGlobalStore();

  const { width } = useScreenSize();

  const hasValidAccess = auth.isAuthenticated && auth.user?.email;

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <Row wrap={false}>
          {Boolean(hasValidAccess) && <SideBar style={{ maxWidth: rem(240)}} />}
          <Column
            style={{
              width:
                width > ScreenSizes.lg && hasValidAccess
                  ? `calc(100% - ${rem(240)}`
                  : '100%',
            }}
          >
            <TopBar auth={Boolean(hasValidAccess)} />
            {children}
          </Column>
        </Row>
      </Styles.AppContainer>
    </ThemeProvider>
  );
};
