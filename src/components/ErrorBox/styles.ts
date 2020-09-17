import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { rem } from '../../utils/rem';

const ErrorBox = styled.div.attrs({})<{
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
  background-color: ${convertHexToRGBA(Colors.error, 0.3)};
  border: 1px solid ${Colors.error};
`;

const Styles = {
  ErrorBox,
};

export { Styles };
