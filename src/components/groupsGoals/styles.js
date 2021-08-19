import styled from "styled-components";

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
    margin-top: -5px;
  }

  span {
    color: #071865;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 768px) {
    width: 500px;
    margin: 10px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    border: none;

    svg {
      width: 20px;
      height: 20px;
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
