import styled from 'styled-components';

const TopBar = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.05);
  height: 96px;
  display: flex;
  align-items: center;
  padding: 0 10%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  z-index: 10;

  div {
    span,
    img {
      margin-left: 40px;
    }

    .mobile-dowloads {
      @media (max-width: 600px) {
        position: fixed;
        bottom: 1%;
        right: 2%;
        display: flex;
        flex-direction: column;

        img {
          opacity: 0.5;
          margin-left: 0;
          margin-top: 10px;

          &:hover,
          &:focus {
            opacity: unset;
          }
        }
      }
    }
  }
`;

export const Styles = {
  TopBar,
};
