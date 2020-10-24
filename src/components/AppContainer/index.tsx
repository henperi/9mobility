import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
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
  const isOnboardingRoute = window.location.pathname.includes('onboarding');

  const hasValidAccess = auth.isAuthenticated && auth.user?.email;

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const closeSidebar = () => {
      if (showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('click', closeSidebar);

    return () => window.removeEventListener('click', closeSidebar);
  }, [showSidebar]);

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <BrowserRouter>
          <Row wrap={false}>
            {auth.isAuthenticated &&
            window.location.pathname !== '/onboarding/register' ? (
              <SideBar
                style={{ maxWidth: rem(240), minWidth: rem(240) }}
                showSidebar={showSidebar}
              />
            ) : null}
            <Column
              style={{
                width:
                  width >= ScreenSizes.lg &&
                  hasValidAccess &&
                  !isOnboardingRoute
                    ? `calc(100% - ${rem(240)}`
                    : '100%',
              }}
            >
              <TopBar
                auth={Boolean(hasValidAccess)}
                style={{ height: !isOnboardingRoute ? '72px' : '92px' }}
                setShowSidebar={setShowSidebar}
              />
              {children}
            </Column>
          </Row>
        </BrowserRouter>
      </Styles.AppContainer>
    </ThemeProvider>
  );
};
