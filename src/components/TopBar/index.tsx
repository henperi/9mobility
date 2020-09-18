import React, { HtmlHTMLAttributes, useEffect } from 'react';
import { Styles } from './style';

import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import GooglePlay from '../../assets/images/google-play.png';
import AppStore from '../../assets/images/app-store.png';
import { ReactComponent as PowerIcon } from '../../assets/images/power.svg';
import { Row } from '../Row';
import { useGlobalStore } from '../../store';
import { removeAuthUser } from '../../store/modules/auth/actions';
import { useTokenRefresher } from '../../customHooks/useTokenHandler';

export interface ITopBar extends HtmlHTMLAttributes<HTMLDivElement> {
  auth: boolean;
}

export const TopBar: React.FC<ITopBar> = (props) => {
  const { auth, ...rest } = props;
  const { dispatch, state } = useGlobalStore();

  const [refresh] = useTokenRefresher(state);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleLogout = () => {
    dispatch(removeAuthUser());
  };

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
        <Row
          style={{ width: '100%' }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <PowerIcon onClick={handleLogout} />
        </Row>
      )}
    </Styles.TopBar>
  );
};
