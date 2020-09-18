import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { rem } from '../../utils/rem';

const SuccessBox = styled.div.attrs({})<{
  height?: number;
  width?: number;
}>`
  ${({ height }) =>
    height &&
    css`
      height: ${height / 16}rem;
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width / 16}rem;
    `}
  
  padding: ${rem(10)};
  width: 100%;
  background-color: ${convertHexToRGBA(Colors.lightGreen, 0.3)};
  border: 1px solid ${Colors.lightGreen};
`;

const Styles = {
  SuccessBox,
};

export { Styles };
