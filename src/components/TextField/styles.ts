import styled, { css } from 'styled-components';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
// import { fontColor } from '../../themes/colors';
// import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

const Input = styled.input.attrs({})`
  outline: none;
  /* color: ${Colors.blackGrey}; */
  font: inherit;
  border: unset;
  background-color: transparent;
  font-size: 16px;
  flex: 3;
  margin: auto 0%;
  width: 100%;
  max-height: 50px;
  min-height: 50px;
`;

const TextField = styled.div.attrs({})<{
  backgroundColor?: string;
  hasError?: boolean;
  verticalMargin?: boolean;
}>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  display: flex;
  align-items: center;

  border: 1px solid #00987b;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${({ verticalMargin }) =>
    verticalMargin &&
    css`
      margin-top: 1rem;
    `};

  ${(props) =>
    props.hasError &&
    css`
      border: 2px solid #ff3e3ea6;
    `};

  .inputIcon {
    height: 100%;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    font: inherit;
    color: ${convertHexToRGBA(Colors.blackGrey, 0.8)};

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Styles = {
  TextField,
  Input,
};

export { Styles };
