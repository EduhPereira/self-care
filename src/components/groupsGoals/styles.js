import styled from "styled-components";

export const Container = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  padding-bottom: 150px;

  .MuiCircularProgress-root {
    margin-top: 150px;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  @media (min-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
    width: 700px;
    margin: auto;
    justify-content: center;
    align-items: center;
  }
`;

export const Card = styled.div`
  margin: 10px 10px;
  padding: 10px 5px;
  width: 280px;
  box-shadow: 0 0 4px #696969;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: start;
  word-break: break-all;

  div:first-child {
    text-align: center;
  }

  span {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.85);
    cursor: default;
  }

  .Title {
    text-align: center;
  }

  .Title .Goal {
    color: #071865;
    font-weight: bold;
    margin: 0;
    padding: 0;
    cursor: default;
  }
  .Difficulty span {
    color: #071865;
    font-weight: bold;
  }

  .Category span {
    color: #071865;
    font-weight: bold;
  }

  .Achievements span {
    color: #071865;
    font-weight: bold;
  }

  p {
    padding: 5px;
    word-break: break-all;
  }

  @media (min-width: 768px) {
    width: 500px;
    margin: 10px;
  }
`;

export const Icons = styled.div`
  text-align: right;
  display: flex;
  justify-content: center;

  svg {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  span {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.85);
    cursor: default;
  }

  .Delete {
    color: #d81c48;
  }

  .Edit {
    color: #f7a902;
  }
  .Check {
    color: #285bd3;
  }

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  text-align: center;
  width: 120px;
  height: 35px;
  border-radius: 8px;
  margin-right: 5px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
`;

export const PreviousButton = styled(Button)`
  border: 2px solid #5cb61f;
  background-color: #fff;
  color: #5cb61f;
`;

export const NextButton = styled(Button)`
  background-color: #5cb61f;
  border: none;
  color: #fff;
`;

export const CreateGoal = styled.div`
  display: none;
  button {
    font-size: 1rem;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 10px;
    background: #285bd3;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;
