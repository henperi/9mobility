import styled from 'styled-components';
import { rem } from '../../utils/rem';
import { Colors } from '../../themes/colors';

const RadioInput = styled.span.attrs({})<{ active?: boolean }>`
  box-sizing: border-box;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: ${({ active }) =>
    active ? `1px solid ${Colors.darkGreen}` : '1px solid #979797'};
  display: inline-block;
  margin-right: ${rem(10)};
  position: relative;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .checked {
    position: absolute;
    content: '';
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: ${Colors.darkGreen};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Styles = {
  RadioInput,
};

export { Styles };
