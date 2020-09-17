import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
import { rem } from '../../utils/rem';

export interface ICardProps {
  padding?: string;
  margin?: number;
  showOverlayedDesign?: boolean;
  cardHeader?: {
    title?: string;
    subtitle?: string;
  };
  fullWidth?: boolean;
  fullHeight?: boolean;
  color?: string;
}

const Card = styled.div.attrs({})<ICardProps>`
  padding: ${({ padding }) => padding || '7%'};
  min-height: 2.5rem;
  width: fit-content;
  border-radius: 4px;
  background-color: ${({ color }) => color || Colors.white};
  box-shadow: 0 22px 115px -85px rgba(0, 0, 0, 0.7);
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'fit-content')};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

const CardHeader = styled.div`
  padding: ${rem(40)} 7%;
  padding-top: ${rem(65)};
  position: relative;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
  background: radial-gradient(circle, #00a17e 0%, #b4c404 0%, #006848 100%)
    no-repeat;
  position: absolute;
  width: 100%;
  height: fit-content;
  height: ${rem(182)};
  top: 0;
  left: 0;
  * {
    color: ${Colors.white};
  }

  img {
    position: absolute;
    right: 10%;
    top: 12.5%;
  }
`;

const OverlayedDesign = styled.div`
  height: ${rem(300)};
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0.08;
  z-index: -1;
  z-index: -1;

  &:before {
    content: '';
    position: absolute;
    bottom: 115%;
    left: -10%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      #b4c404 0%,
      #008b69 75.74%,
      #006848 100%
    );
    transform-origin: left bottom;
    transform: rotateZ(135deg) skew(5deg, 5deg);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 115%;
    right: -10%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -45deg,
      #b4c404 0%,
      #008b69 75.74%,
      #006848 100%
    );
    transform-origin: right bottom;
    transform: rotateZ(-135deg) skew(-5deg, -5deg);
  }
`;

const Styles = {
  Card,
  OverlayedDesign,
  CardHeader,
};

export { Styles };
