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

  .MuiCircularProgress-root{
    margin-top: 150px;
  }
  
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
  padding: 10px;

  .Title{
    text-align: center;
    margin-bottom: 20px;
  }

  p{
    margin-bottom: 10px;
  }
`;

export const Icons = styled.div`
  text-align: right;
  margin-top: 20px;

  svg{
    margin: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .Delete{
    color: #931706;
  }

  .Edit{
    color: #937703;
  }

  .Check{
    color: #145092;
  }

`
