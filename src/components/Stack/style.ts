import styled from 'styled-components';

export interface IStackProps {
  position?: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

const Stack = styled.div.attrs({})<IStackProps>`
  position: relative;
`;

const StackChild = styled.div.attrs({})<IStackProps>`
  position: absolute;
  content: '';
`;

const Styles = {
  Stack,
  StackChild,
};

export { Styles };
