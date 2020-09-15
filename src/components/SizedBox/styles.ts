import styled, { css } from 'styled-components';
import { ISizedBox } from '.';

const SizedBox = styled.div.attrs({})<ISizedBox>`
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
`;

const Styles = {
  SizedBox,
};

export { Styles };
