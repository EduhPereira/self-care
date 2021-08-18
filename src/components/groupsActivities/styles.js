import styled from "styled-components";

export const Container = styled.div`
  width: 287px;
  min-height: 136px;
  box-shadow: 0 0 4px #696969;
  border-radius: 10px;
  margin: 10px auto;
  padding: 5px;
  text-align: end;

  div {
    cursor: pointer;
  }

  h1 {
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    margin-top: 11px;
    margin-bottom: 20px;
  }

  p {
    text-align: start;
    margin-left: 10px;
    margin-bottom: 9px;
    font-size: 14px;
  }

  .button_group {
    width: 87px;
    height: 34px;
    margin-top: 0;
    background-color: #285bd3;
    border-radius: 18px;
    padding: 6px 9px 7px;
    border: none;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const Icons = styled.div`
  text-align: right;
  margin-right: -2px;

  svg {
    margin: 5px;
    width: 25px;
    height: 25px;
    cursor: pointer;
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
`;
