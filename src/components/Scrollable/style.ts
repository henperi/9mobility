import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
// import { Row } from '../Row';

export interface IScrollableProps {
  position?: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  hideScrollBar?: boolean;
}

export interface PositionConfig {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

const Scrollable = styled.div.attrs({})<IScrollableProps>`
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  flex-flow: row nowrap;
  width: 100%;
  scroll-behavior: smooth;
  align-items: center;

  ${({ hideScrollBar }) =>
    hideScrollBar &&
    css`
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    `}
`;

const ScrollableArrowsContainer = styled.div.attrs({})<{
  hideScrollArrows?: boolean;
  positionConfig?: PositionConfig;
  width?: string;
}>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: ${({ width }) => width || '100%'};
  display: ${({ hideScrollArrows }) => hideScrollArrows && 'none'};
  z-index: 10;
  align-items: center;

  .arrow {
    background-color: ${Colors.white};
    height: 35px;
    width: 35px;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }

  .fade-2 {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .arrow:last-child {
    transform: rotate(-90deg);
  }

  .arrow:first-child {
    transform: rotate(90deg);
  }
`;

const Styles = {
  Scrollable,
  ScrollableArrowsContainer,
};

export { Styles };
