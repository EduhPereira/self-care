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
`;

export const ContentCategory = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  h3 {
    margin-right: 10px;
  }

  select {
    text-align: center;
    padding: 6px 10px;
    width: 90px;
    outline: none;
    margin-left: 10px;
  }
  option {
    background: white;
    color: black;
  }
`;

export const Cards = styled.div``;

export const Card = styled.div`
  margin-top: 40px;
  width: 250px;
  height: 150px;
  box-shadow: 0 0 4px #696969;
  border-radius: 10px;
`;
