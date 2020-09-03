import styled, { css } from 'styled-components';

const SizedBox = styled.div.attrs({})<{
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
`;

const Styles = {
  SizedBox,
};

export { Styles };
