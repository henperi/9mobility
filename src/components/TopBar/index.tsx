import React, { HtmlHTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';
import { Styles } from './style';

import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import GooglePlay from '../../assets/images/google-play.png';
import AppStore from '../../assets/images/app-store.png';
import { ReactComponent as PowerIcon } from '../../assets/images/power.svg';
import { ReactComponent as BellIcon } from '../../assets/images/bell.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/settings.svg';
import { Row } from '../Row';
import { useGlobalStore } from '../../store';
import { removeAuthUser } from '../../store/modules/auth/actions';
import { Text } from '../Text';
import { Colors } from '../../themes/colors';
import { useWindowSize } from '../../customHooks/useWindowSize';
import { ScreenSizes } from '../Column/styles';
import { useInterceptor } from '../../customHooks/useInterceptor';

export interface ITopBar extends HtmlHTMLAttributes<HTMLDivElement> {
  auth: boolean;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopBar: React.FC<ITopBar> = (props) => {
  const { auth, setShowSidebar = () => null, ...rest } = props;
  const { dispatch } = useGlobalStore();
  const history = useHistory();
  useInterceptor();

  // const [refresh] = useTokenRefresher(state);

  // useEffect(() => {
  // refresh();
  // }, [refresh]);

  const handleLogout = () => {
    dispatch(removeAuthUser());
  };

  const { width } = useWindowSize();

  return (
    <Styles.TopBar {...rest} auth={auth}>
      {!auth ? (
        <>
          <Logo />
          <Row alignItems="center">
            <span>Home</span>
            <span>FAQ</span>
            <Row className="mobile-dowloads">
              <img src={GooglePlay} alt="GooglePlay" />
              <img src={AppStore} alt="AppStore" />
            </Row>
          </Row>
        </>
      ) : (
        <>
          {width < ScreenSizes.lg && (
            <Styles.HanburgerMenu
              onClick={() => setShowSidebar((prev) => !prev)}
            />
          )}
          <Row
            style={{ width: '100%' }}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Text
              color={Colors.white}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <BellIcon style={{ marginRight: '8px' }} onClick={() => null} />
            </Text>
            <Text
              color={Colors.white}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => history.push('/settings')}
            >
              <SettingsIcon style={{ marginRight: '8px' }} />
              Settings
            </Text>
            <Text
              color={Colors.white}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={handleLogout}
            >
              <PowerIcon style={{ marginRight: '8px' }} />
              Logout
            </Text>
          </Row>
        </>
      )}
    </Styles.TopBar>
  );
};
