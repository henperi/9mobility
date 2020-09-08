import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { ITextField } from '.';
import { rem } from '../../utils/rem';
// import { fontColor } from '../../themes/colors';
// import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

const Input = styled.input.attrs({})`
  outline: none;
  /* color: ${Colors.blackGrey}; */
  font: inherit;
  border: unset;
  background-color: transparent;
  font-size: ${rem(16)};
  flex: 3;
  margin: auto 0%;
  width: 100%;
  max-width: fill-available;
  max-height: 50px;
  min-height: 50px;
  padding: 0 ${rem(10)};
`;

const TextFieldContainer = styled.div<{
  verticalMargin?: boolean;
}>`
  ${({ verticalMargin }) =>
    verticalMargin &&
    css`
      margin-top: 1rem;
    `};
`;

const TextField = styled.div.attrs((props: ITextField) => ({
  backgroundColor: props.backgroundColor || '#FBFBFB',
}))<{
  backgroundColor?: string;
  hasError?: boolean;
  disabled?: boolean;
}>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${rem(5)};
  display: flex;
  align-items: center;
  width: 100%;

  &:focus-within {
    border: 1px solid ${Colors.lightGreen};
  }

  border: 1px solid ${convertHexToRGBA(Colors.grey)};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;

      input,
      input:disabled {
      }
    `};

  ${(props) =>
    props.hasError &&
    css`
      border: 1px solid ${Colors.error};
      background-color: ${convertHexToRGBA(Colors.error, 0.05)};
    `};

  .inputIcon {
    height: 100%;
    /* padding: 0 0.5rem; */
    display: flex;
    align-items: center;
    font: inherit;
    color: ${convertHexToRGBA(Colors.blackGrey, 0.8)};

    &:first-child {
      margin-left: 0;
      padding-left: ${rem(10)};
    }
    &:last-child {
      margin-right: 0;
      padding-right: ${rem(10)};
    }
  }
`;

const UnitTextField = styled(TextField).attrs((props) => ({
  ...props,
  maxLength: 1,
}))`
  width: ${rem(50)};
  margin-right: ${rem(8)};

  &:last-child {
    margin-right: unset;
  }

  input {
    text-align: center;
  }
`;

const Styles = {
  TextFieldContainer,
  TextField,
  Input,
  UnitTextField,
};

export { Styles };
