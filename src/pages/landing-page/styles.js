import styled from "styled-components";
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
`;

export const Logo = styled.h1`
  color: #cf3e72;
  font-family: cursive;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

export const Button = styled.button`
  outline: none;
  cursor: pointer;
  width: 100px;
  font-size: 14px;
  font-weight: 700;
`;

export const SigninBtn = styled(Button)`
  border: 2px solid #387b52;
  color: #387b52;
  background-color: transparent;
`;

export const SignupBtn = styled(Button)`
  background-color: #387b52;
  color: #fff;
  border: none;
`;
