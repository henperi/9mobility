import styled from 'styled-components';
import { IFlex } from '.';

const Row = styled.div.attrs({})<IFlex>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
`;

const Styles = {
  Row,
};

export { Styles };
