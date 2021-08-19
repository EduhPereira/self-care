import styled from "styled-components";

export const Container = styled.div`
    ul {
        border-radius: 8px;
        box-shadow: 0 0 4px #696969;
    }
`

export const EditGroupButton = styled.button`
    width: 128px;
    height: 40px;
    border: none;
    border-radius: 11px;
    margin-top: 25px;
    font-weight: 600;
    background-color: #36B520;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.4s;

    :hover {
        background-color: #109358;
    }
`