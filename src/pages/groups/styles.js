import styled from "styled-components";

export const Container = styled.main`
    section {
        margin-bottom: 24px;
    }

    button + button {
        margin-left: 22px;
    }

    div {
        margin-top: 11px;
        font-size: 14px;
    }

    span {
        font-size: 14px;
        color: #285bd3;
        cursor: pointer;
    }
`

export const Button = styled.button`
    width: 128px;
    height: 40px;
    border: none;
    border-radius: 11px;
    margin-top: 25px;
    font-weight: 600;
    background-color: ${props => (props.showList ? "#285BD3" : "#efefef")};
    color: ${props => (props.showList ? "#fff" : "#000")};
`