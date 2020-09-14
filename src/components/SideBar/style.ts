import styled from 'styled-components';
import { rem } from '../../utils/rem';
import { Colors } from '../../themes/colors';
import { ScreenSizes } from '../Column/styles';

const SideBar = styled.div`
  height: 100vh;
  /* min-width: ${rem(240)};
  max-width: ${rem(240)}; */
  width: fill-available;
  background-color: ${Colors.white};
  padding: ${rem(32)} ${rem(16)};
  padding-left: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: ${ScreenSizes.lg}px) {
    display: none;
  }
`;

export const Styles = {
  SideBar,
};
