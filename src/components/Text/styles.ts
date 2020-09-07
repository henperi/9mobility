import styled, { css } from 'styled-components';
import { fontColor } from '../../themes/colors';
import { TextProps } from '.';
import { rem } from '../../utils/rem';

const Text = styled.span.attrs((props: TextProps) => ({
  size: props.size || 16,
  casing: props.casing || 'inherit',
  alignment: props.alignment || 'left',
}))<TextProps & { size: number }>`
  color: ${fontColor};
  font-size: ${({ size }) => rem(size)};
  line-height: ${({ size }) => rem(size * (size < 13 ? 1 : 1.35))};
  text-transform: ${({ casing }) => casing};
  text-align: ${({ alignment }) => alignment};

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
