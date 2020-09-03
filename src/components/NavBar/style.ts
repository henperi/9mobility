import styled from 'styled-components';

const NavBar = styled.div`
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

  div {
    span {
      margin-right: 40px;

      &:last-child {
        margin-right: unset;
      }
    }
  }
`;

export const Styles = {
  NavBar,
};
