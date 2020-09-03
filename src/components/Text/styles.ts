import styled, { css } from 'styled-components';
import { fontColor } from '../../themes/colors';
// import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

const Text = styled.span.attrs({})<{
  variant?: 'darker' | 'lighter' | 'white' | undefined;
  size?: number;
  color?: string;
}>`
  color: ${fontColor};

  ${({ size }) =>
    size &&
    css`
      font-size: ${size / 16}rem;
      line-height: ${(size / 16) * (size < 13 ? 1 : 1.35)}rem;
    `};

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;

const Styles = {
  Text,
};

export { Styles };
