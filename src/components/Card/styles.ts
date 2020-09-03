import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

const Card = styled.div.attrs({})<{
  showOverlayedDesign?: boolean;
}>`
  padding: 40px 5%;
  min-height: 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  background-color: ${Colors.white};
  box-shadow: 0 22px 115px -85px rgba(0, 0, 0, 0.7);
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;

  ${({ showOverlayedDesign }) =>
    showOverlayedDesign &&
    css`
      &:before {
        position: absolute;
        content: '';
        display: flex;
        align-self: center;
        width: 80%;
        height: 80%;
        background-color: ${convertHexToRGBA(Colors.lightGreen, 0.04)};
        z-index: -1;
        transform: rotateZ(45deg);
        left: -50%;
      }
      &:after {
        position: absolute;
        content: '';
        display: flex;
        align-self: center;
        width: 80%;
        height: 80%;
        background-color: ${convertHexToRGBA(Colors.lightGreen, 0.04)};
        z-index: -1;
        transform: rotateZ(45deg);
        right: -50%;
      }
    `}
`;

const Styles = {
  Card,
};

export { Styles };
