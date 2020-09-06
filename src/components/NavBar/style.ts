import styled from 'styled-components';
import { rem } from '../../utils/rem';
import { Colors } from '../../themes/colors';

const NavBar = styled.div`
  height: 100vh;
  min-width: ${rem(240)};
  background-color: ${Colors.white};
  padding: ${rem(32)} ${rem(16)};
  padding-left: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Styles = {
  NavBar,
};
