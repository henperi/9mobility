import styled from 'styled-components';

import { ReactComponent as ArrowComponent } from '../../assets/images/arrowDown.svg';
import { Colors } from '../../themes/colors';

const Arrow = styled(ArrowComponent)`
  background-color: ${Colors.white};
  height: 30px;
  width: 30px;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  transform: rotate(90deg);

  * {
    color: ${Colors.blackGrey};
  }
`;

export const Styles = {
  Arrow,
};
