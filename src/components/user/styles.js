import styled from "styled-components";

export const Container = styled.div`
  width: 85vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  position: relative;

  p{
    margin: 0;
  }

  img {
    width: 94px;
  }

  @media (min-width: 768px) {
    width: 70vw;

    img {
      width: 120px;
    }
  }
`;

export const UserContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  cursor: pointer;

  svg {
    margin-left: 5px;
    width: 40px;
    height: 40px;
    color: #285bd3;
  }
`;

export const BoxUser = styled.div`
  position: absolute;
  width: 120px;
  height: 100px;
  background: white;
  right: 0;
  transform: translateY(70%);
  box-shadow: 0 0 9px #696969;
  display: ${(props) => (props.user ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 5px;
    cursor: pointer;
  }

  svg {
    margin-left: 5px;
    margin-right: 5px;
  }

  .Settings {
    color: #775c00;
  }

  .PowerOf {
    color: #d81c48;
    width: 15px;
    height: 15px;
  }
`;
