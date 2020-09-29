import styled from 'styled-components';
import { Colors } from '../../themes/colors';

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${Colors.grey};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: ${Colors.white};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input.attrs({})<{ active?: boolean }>`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  & + ${CheckBoxLabel} {
    background: ${({ active }) =>
      active ? `${Colors.lightGreen}` : `${Colors.grey}`};
    &::after {
      margin-left: ${({ active }) => (active ? '21px' : '')};
    }
    transition: 0.2s;
  }
`;

const Styles = {
  CheckBoxWrapper,
  CheckBox,
  CheckBoxLabel,
};

export { Styles };
