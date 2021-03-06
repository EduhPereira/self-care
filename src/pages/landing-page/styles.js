import styled from "styled-components";
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
`;

export const Logo = styled.h1`
  color: #cf3e72;
  font-family: cursive;
  @media (max-width: 375px) {
    font-size: 20px;
    margin: 0 5px 0 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

export const Button = styled.button`
  outline: none;
  cursor: pointer;
  height: 40px;
  width: 100px;
  font-size: 14px;
  font-weight: 700;
  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

export const SigninBtn = styled(Button)`
  border: 2px solid #387b52;
  color: #387b52;
  background-color: transparent;
  transition: all 0.3s ease;
  :hover {
    border-color: #93b32b;
    color: #93b32b;
  }
`;

export const SignupBtn = styled(Button)`
  background-color: #387b52;
  color: #fff;
  border: none;
  transition: all 0.3s ease;
  :hover {
    background-color: #93b32b;
  }
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 12px;
  img {
    width: 100%;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: cursive;
    h2 {
      font-size: 26px;
      text-align: center;
      margin-bottom: 16px;
    }
    p {
      font-size: 18px;
      text-align: center;
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
    img {
      width: 40%;
    }
    div {
      width: 60%;
      h2 {
        font-size: 32px;
      }
      p {
        font-size: 20px;
      }
    }
  }
`;

export const AboutSection = styled(Container)`
  background-color: #fff;
  div {
    h2 {
      color: #387b52;
    }
    p {
      color: #4d4d4d;
    }
  }
  button {
    outline: none;
    cursor: pointer;
    width: 200px;
    height: 45px;
    font-size: 18px;
    font-weight: 700;
    margin: 32px 0;
    background-color: #387b52;
    text-transform: capitalize;
    color: #fff;
    border: none;
    border-radius: 50px;
    box-shadow: 11px 10px 12px 0px rgba(44, 43, 43, 0.75);
    -webkit-box-shadow: 11px 10px 12px 0px rgba(44, 43, 43, 0.75);
    -moz-box-shadow: 11px 10px 12px 0px rgba(44, 43, 43, 0.75);
    transition: all 0.3s ease;
    :hover {
      background-color: #93b32b;
    }
  }
`;

export const FeaturesSection = styled(Container)`
  background-color: #93b32b;

  img {
    margin: 50px 0;
  }
  div {
    h2 {
      color: #fff;
      margin: 30px 0;
    }
    p {
      color: #ebebeb;
    }
  }

  @media (min-width: 768px) {
    div {
      p {
        margin: 0 30px 0 0;
      }
    }
  }
`;

export const CreatorsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  padding: 70px 20px 30px;
  background-color: black;
`;

export const CreatorCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 10px;
  font-family: cursive;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s linear;
  img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin-bottom: 10px;
  }
  h3 {
    color: #8a8a8a;
  }
  :hover {
    transform: scale(1.08);
  }
`;
