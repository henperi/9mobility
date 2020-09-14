import styled, { css } from 'styled-components';
import { fontColor } from '../../themes/colors';
import { rem } from '../../utils/rem';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  variant?: 'darker' | 'lighter' | 'white' | undefined;
  color?: string;
  alignment?: 'left' | 'right' | 'center' | 'justify';
  casing?:
    | 'capitalize'
    | 'lowercase'
    | 'uppercase'
    | 'titleCase'
    | 'sentenceCase';
  weight?: string | number;
}

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

  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight};
    `};
`;

const Styles = {
  Text,
};

export { Styles };
