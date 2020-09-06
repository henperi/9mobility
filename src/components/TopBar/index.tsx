import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';
import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import GooglePlay from '../../assets/images/google-play.png';
import AppStore from '../../assets/images/app-store.png';
import { Row } from '../Row';

export const TopBar: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = () => {
  return (
    <Styles.TopBar>
      <Logo />
      <Row alignItems="center">
        <span>Home</span>
        <span>FAQ</span>
        <Row className="mobile-dowloads">
          <img src={GooglePlay} />
          <img src={AppStore} />
        </Row>
      </Row>
    </Styles.TopBar>
  );
};
