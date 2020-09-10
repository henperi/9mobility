import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';

import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import GooglePlay from '../../assets/images/google-play.png';
import AppStore from '../../assets/images/app-store.png';
import { Row } from '../Row';

export interface ITopBar extends HtmlHTMLAttributes<HTMLDivElement> {
  auth: boolean;
}

export const TopBar: React.FC<ITopBar> = (props) => {
  const { auth } = props;
  return (
    <Styles.TopBar auth={auth}>
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
        <></>
      )}
    </Styles.TopBar>
  );
};
