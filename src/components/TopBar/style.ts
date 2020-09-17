import styled, { css } from 'styled-components';
import { ITopBar } from '.';
import { Colors } from '../../themes/colors';
import { ScreenSizes } from '../Column/styles';

const TopBar = styled.div<ITopBar>`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.05);
  height: 96px;
  display: flex;
  align-items: center;
  padding: 0 10%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  z-index: 10;

  ${({ auth }) =>
    auth &&
    css`
      background-color: ${Colors.lightGreen};
    `}

  div {
    span,
    img {
      margin-left: 40px;
    }

    .mobile-dowloads {
      @media (max-width: ${ScreenSizes.md}px) {
        position: fixed;
        bottom: 1%;
        right: 2%;
        display: flex;
        flex-direction: column;

        img {
          opacity: 0.5;
          margin-left: 0;
          margin-top: 10px;

          &:hover,
          &:focus {
            opacity: unset;
          }
        }
      }
    }
  }
`;

export const Styles = {
  TopBar,
};
