import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { rem } from '../../utils/rem';
import { Colors } from '../../themes/colors';
import { ScreenSizes } from '../Column/styles';

const SideBar = styled.div<{ showSidebar?: boolean }>`
  height: 100vh;
  width: fill-available;
  background-color: ${Colors.white};
  padding: ${rem(32)} ${rem(16)};
  padding-left: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  overflow-y: auto;

  @media (max-width: ${ScreenSizes.lg - 0.1}px) {
    /* display: none; */
    position: fixed;
    transform: ${({ showSidebar }) =>
      showSidebar ? 'translateX(0)' : 'translateX(-240rem)'};
    transition: transform 600ms ease-in-out;
  }
`;

// Link

const SideBarLink = styled(NavLink)<{ active?: boolean }>`
  padding: ${rem(5)};
  padding-left: ${rem(25)};
  margin-top: ${rem(10)};
  position: relative;
  display: flex;
  color: #627382;
  font-size: ${rem(15)};
  text-decoration: none;
  display: flex;
  align-items: center;

  svg {
    margin-right: ${rem(6)};
  }

  &.active-sidebar-link {
    font-weight: 600;
    color: ${Colors.darkGreen};

    svg {
      path {
        stroke: ${Colors.darkGreen} !important;
      }
      color: ${Colors.darkGreen} !important;
    }

    &:before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: ${rem(6)};
      height: 100%;
      background-color: ${Colors.darkGreen};
    }
  }

  ${({ active }) =>
    active &&
    css`
      font-weight: 600;
      color: ${Colors.darkGreen};

      &:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: ${rem(6)};
        height: 100%;
        background-color: ${Colors.darkGreen};
      }
    `}
`;

export const Styles = {
  SideBar,
  SideBarLink,
};
