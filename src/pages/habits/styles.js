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

export const ContentCategory = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;

  h3 {
    margin-right: 10px;
    font-weight: 400;
  }

  select {
    text-align: center;
    padding: 6px 10px;
    width: 100px;
    outline: none;
    margin-left: 10px;
    border: 1px solid #696969;
    background: white;
    font-size: 1rem;
  }
  option {
    background: white;
    color: black;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 280px;
  box-shadow: 0 0 4px #696969;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .Title {
    text-align: center;
  }

  .Title .Habit {
    color: #071865;
    font-weight: bold;
    margin: 0;
    padding: 0;
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

  .Frequency span {
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

export const CreateHabit = styled.div`
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
