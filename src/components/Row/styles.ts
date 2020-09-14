import styled, { css } from 'styled-components';
import { IFlex } from '.';
import { rem } from '../../utils/rem';
import { appMargin } from '../Column/styles';

const Row = styled.div.attrs({})<IFlex>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  flex-flow: ${(props) => props.wrap && 'row wrap'};

  ${({ useAppMargin }) =>
    useAppMargin &&
    css`
      margin: 0 -${appMargin}%;
      margin-bottom: -${appMargin * 2}%;
    `}

  ${({ childGap }) =>
    childGap &&
    css`
      margin: -${rem(childGap)};
      & > * {
        margin: ${rem(childGap)};
      }
    `}
`;

const Styles = {
  Row,
};

export { Styles };
