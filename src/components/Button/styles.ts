import styled, { css } from 'styled-components';
import { backgroundColor, Colors } from '../../themes/colors';

const Button = styled.button.attrs({})<{
  variant?: 'default' | 'primary' | 'secondary' | 'Tertiary' | 'Neutral';
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
}>`
  outline: none;
  border: none;

  padding: 20px 28px;
  background-color: ${backgroundColor};
  color: ${({ variant }) => variant !== 'default' && Colors.white};
  font-weight: 500;

  transition: all 300ms ease-in-out;
  margin-right: 5px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.13);
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${({ loading }) =>
    loading &&
    css`
      cursor: wait;
      opacity: 0.4;
    `}
`;

const Styles = {
  Button,
};

export { Styles };
