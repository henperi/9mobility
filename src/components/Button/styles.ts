import styled, { css } from 'styled-components';
import { backgroundColor, Colors } from '../../themes/colors';
import { IButtonProps } from '.';

const Button = styled.button.attrs((props: IButtonProps) => ({
  borderColor: props.borderColor || 'transparent',
}))<IButtonProps>`
  outline: none;
  border: none;

  ${({ border }) =>
    border &&
    css`
      border: 1px solid #efefef;
    `};

  padding: 20px 28px;
  background-color: ${backgroundColor};
  color: ${({ variant }) => variant !== 'default' && Colors.white};
  font-weight: 500;

  transition: all 300ms ease-in-out;
  margin-right: 5px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  cursor: pointer;
  border-radius: 2px;
  font-family: inherit;

  ${({ elevated }) =>
    elevated &&
    css`
      box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.13);
    `};

  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 28px; ;
    `};

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
