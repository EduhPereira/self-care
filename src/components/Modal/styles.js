import styled from "styled-components";

export const ModalDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
`;

export const Container = styled.div`
  width: 30%;
  height: 90%;
  background-color: #fff;
  color: #000;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerButtons = styled.div`
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export const ButtonUpdate = styled.button`
  background-color: #36b520;
  color: #fff;
  outline: none;
  width: 120px;
  height: 32px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

export const ButtonCancel = styled.button`
  background-color: #d81c48;
  color: #fff;
  width: 120px;
  height: 32px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;
