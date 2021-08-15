import styled from "styled-components";

export const Container = styled.main`

    text-align: center;

    section {
        margin-bottom: 24px;

        div {
            margin-top: 11px;
            font-size: 14px;
        }
    }

    button + button {
        margin-left: 22px;
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
export const ModalDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    margin-top: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.8);
    display: ${props => props.showModal ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
`;

export const ContainerForm = styled.div`
    width: 300px;
    height: 90%;
    background-color: #fff;
    color: #000;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`    
    display: flex;
    flex-direction: column;
    padding: 10px 36px;

    input {
        width: 240px;
        margin: 10px 0;
        height: 42px;
        border-radius: 10px;
        font-size: 20px;
        outline: none;
    }

    select {
        margin: 10px 0;
        height: 42px;
        border-radius: 10px;
        background-color: #fff;
        font-weight: bold;

        option {
            font-weight: bold;
        }
    }

    label {
        font-size: 20px;
        font-weight: 500;
        text-align: start;

        span {
            color: red;
            font-size: 12px;
        }
    }
`

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
    height: 44px;
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
    height: 44px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
`;