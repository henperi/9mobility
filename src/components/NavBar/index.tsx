import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';
import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import { rem } from '../../utils/rem';

export const NavBar: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Styles.NavBar {...props}>
      <Logo style={{ marginLeft: rem(20) }} />
      {/* <span>9 Mobility</span> */}
      {/* <div>
        <span>Home</span>
        <span>FAQ</span>
      </div> */}
    </Styles.NavBar>
  );
};
