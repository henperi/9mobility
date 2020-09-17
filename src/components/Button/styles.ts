import styled, { css } from 'styled-components';
import { backgroundColor, Colors } from '../../themes/colors';
import { IButtonProps } from '.';
import { rem } from '../../utils/rem';
import { Styles as StackStyles } from '../Stack/style';

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

  /* padding: 20px 28px; */
  min-height: ${rem(45)};
  background-color: ${backgroundColor};
  color: ${({ variant }) => variant !== 'default' && Colors.white};
  font-weight: 500;

  transition: all 300ms ease-in-out;
  /* margin-right: 5px; */
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  cursor: pointer;
  border-radius: 5px;
  font-family: inherit;

  ${({ outline }) =>
    outline &&
    css`
      background-color: unset;
      border: 1px solid ${backgroundColor};
      color: ${backgroundColor};
    `}

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

  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: wait;
      opacity: 0.4;
    `}
`;

const DropDownStack = styled(StackStyles.Stack)`
  position: relative;
  width: fit-content;
`;

const DropDownContainer = styled(StackStyles.StackChild)`
  position: absolute;
  top: calc(100%);
  z-index: 1;
  height: fit-content;
  background: #ffffff;
  border: 1px solid #efefef;
  box-sizing: border-box;
  box-shadow: 0px 5px 20px rgba(219, 219, 219, 0.25);
  border-radius: 4px;
  max-height: 300px;
  overflow: auto;
  min-width: 100%;
`;

const DropDownItem = styled(StackStyles.Stack)`
  cursor: pointer;
  padding: 8px;
  cursor: pointer;
  color: #344563;
  display: block;
  text-decoration: none;

  &:hover {
    background: #f4f5f7;
    border-radius: 4px;
  }
`;

const Styles = {
  Button,
  DropDownStack,
  DropDownContainer,
  DropDownItem,
};

export { Styles };
