import styled from "styled-components";

export const Container = styled.main`

    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    section {
        margin-bottom: 24px;
        ${({ showModal }) => showModal ? `
            -webkit-filter: blur(1px);
            -moz-filter: blur(1px);
            -o-filter: blur(1px);
            -ms-filter: blur(1px);
            filter: blur(1px);
        `: ""}
        
        div {
            margin-top: 11px;
            font-size: 14px;
        }
    }

    span {
        font-size: 14px;
        color: #285bd3;
        cursor: pointer;
    }

    .box {
        height: 117px;
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
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(1, 1, 1, 0.7);
    font-family: "Poppins", sans-serif;
    transition: 0.2s;
    visibility: ${(props) => `${props.showModal ? "visible" : "hidden"}`};
    opacity: ${(props) => `${props.showModal ? "1" : "0"}`};
`;

export const Form = styled.form`    
    transition: 0.2s;
    width: 270px;
    transform: ${(props) =>
        `${props.showModal ? "translateY(0%)" : "translateY(20%)"}`};
    background: white;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 15px;

    @media(min-width: 768px) {
        transform: ${(props) =>
        `${props.showModal ? "translateY(0%)" : "translateY(50%)"}`};
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
        font-weight: 500;
    }

    input {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #969696;
        outline: none;
    }

    select {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #969696;
        background: white;
        outline: none;

        option {
            font-weight: bold;
        }
    }

    label {
        margin-bottom: 10px;
        font-weight: 500;

        span {
            color: red;
            font-size: 12px;
        }
    }
`

export const ContainerButtons = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto;
    justify-content: center;
    align-items: center;

    button {
        color: white;
        background: #d81c48;
        border: none;
        width: 100px;
        margin: 5px;
        padding: 10px;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
    }

    .update {
        background: #36b520;
    }
`;