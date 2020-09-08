import styled, { css } from 'styled-components';

const PageBody = styled.div.attrs({})<{
  centeralize?: boolean;
}>`
  ${({ centeralize }) =>
    centeralize &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  min-height: calc(100vh - 96px);
  padding: 20px 10%;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const Styles = {
  PageBody,
};

export { Styles };
