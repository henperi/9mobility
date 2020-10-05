import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { ScreenSizes } from '../Column/styles';
// import { rem } from '../../utils/rem';

export interface IModalProps {
  padding?: string;
  margin?: number;
  showOverlayedDesign?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
  };
  fullWidth?: boolean;
  fullHeight?: boolean;
  color?: string;
  defaultFooter?: {
    actionText?: string;
    closeText?: string;
  };
  showDefaultFooter?: boolean;
  showCloseButton?: boolean;
  onClose?: () => any;
  isVisible?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Modal = styled.div.attrs({})<IModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${convertHexToRGBA('#000000', 0.8)};
  display: flex;
  z-index: 10;

  .child {
    margin: auto;
    width: 80%;
    max-width: 80%;
    overflow-y: auto;
    padding: 2.5%;
    position: relative;
    max-height: 80%;

    @media (min-width: ${ScreenSizes.md}px) {
      width: 50%;

      ${({ size }) =>
        size === 'sm' &&
        css`
          width: 40%;
        `}

      ${({ size }) =>
        size === 'md' &&
        css`
          width: 60%;
        `}

      ${({ size }) =>
        size === 'lg' &&
        css`
          width: 80%;
        `}
    }

    .x-close {
      all: unset;
      position: absolute;
      top: 0;
      right: 0;
      margin: 5px;
      cursor: pointer;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 14px;
      font-size: 14px;
      background-color: ${Colors.white};
      box-shadow: 0px 2px 34px 0px ${Colors.blackGrey};
      outline: none;
      border: none;
    }
  }

  .child::-webkit-scrollbar {
    width: 0;
  }

  /* 
  padding: ${({ padding }) =>
    padding ||
    '7%'};
  min-height: 2.5rem;
  min-width: 50%;
  border-radius: 4px;
  background-color: ${({
    color,
  }) =>
    color ||
    Colors.white};
  box-shadow: 0 22px 115px -85px rgba(0, 0, 0, 0.7);
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  height: ${({
    fullHeight,
  }) => (fullHeight ? '100%' : 'fit-content')}; 
  */

  /* ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `} */
`;

export const Styles = {
  Modal,
};
