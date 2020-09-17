import styled from 'styled-components';
import { rem } from '../../utils/rem';
import { Colors } from '../../themes/colors';

const Checkbox = styled.span.attrs({})<{}>`
  box-sizing: border-box;
  height: 24px;
  min-width: 24px;
  border: 1px solid #979797;
  border-radius: 4px;
  background-color: #d8d8d8;
  display: inline-block;
  margin-right: ${rem(10)};
  position: relative;
  transition: all 300ms ease-in-out;
  cursor: pointer;

  .checked {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: ${Colors.darkGreen};
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      position: absolute;
      content: '';
      width: 30%;
      height: 60%;
      border-right: 2px solid white;
      border-bottom: 2px solid white;
      transform: rotateZ(45deg);
      margin-bottom: 20%;
    }
  }
`;

const Styles = {
  Checkbox,
};

export { Styles };
