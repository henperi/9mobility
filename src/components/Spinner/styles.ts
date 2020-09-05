import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div.attrs({})<{
  isFixed: boolean;
  size: number;
}>`
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isFixed &&
    css`
      position: fixed;
      display: flex;
      z-index: 10;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    `}

  &::before {
    content: '';
    position: absolute;
    height: inherit;
    width: inherit;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  &::after {
    position: absolute;
    content: '';
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    border: solid ${(props) => props.size / 10}px #fff;
    border-bottom-color: #747be5;
    border-radius: 50%;
    will-change: animation;
    animation: 1.35s linear infinite ${spin};
    z-index: 1;
  }
`;

const Styles = {
  Spinner,
};

export { Styles };
