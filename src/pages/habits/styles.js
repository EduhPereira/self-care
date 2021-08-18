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
  font-family: 'Poppins', sans-serif;
  padding-bottom: 150px;

  .MuiCircularProgress-root{
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
    border: 1px solid  #696969;
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
  @media(min-width: 768px){
    flex-wrap: wrap;
    flex-direction: row;
    width: 700px;
    margin: auto;
    justify-content: center;
    
  }

`;

export const Card = styled.div`
  margin: 10px 10px;
  width: 250px;
  height: 165px;
  box-shadow: 0 0 4px #696969;
  border-radius: 10px;
  padding: 10px;

  .Title{
    text-align: center;
    margin-bottom: 20px;
  }

  .Title span{
    color: #071865;
    font-weight: bold;
  }

  .Difficulty span{
    color: #770B04;
    font-weight: bold;
  }

  .Category span{
    color: #775C00;
    font-weight: bold;
  }

  p{
    margin-bottom: 10px;
  }

  
`;

export const Icons = styled.div`
  text-align: right;
  margin-right: -2px;

  svg{
    margin: 5px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .Delete{
    color: #D81C48;
  }

  .Edit{
    color: #F7A902;
  }

  .Check{
    color: #285BD3;
  }

`


export const CreateHabit = styled.div`
  display: none;
  button{
    font-size: 1rem;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 10px;
    background: #285BD3;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  @media(min-width: 768px){
    display: flex;
    
  }

`
