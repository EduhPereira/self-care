import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(1, 1, 1, 0.7);
    font-family: 'Poppins', sans-serif;
    visibility: ${props => `${props.visible ? 'visible': 'hidden'}`};

    form{
        width: 80vw;
        background: white;
        margin: 30px auto;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: 15px;
    }

    form h2{
        text-align: center;
        margin-bottom: 20px;
        font-weight: 500;
    }

    form label{
        margin-bottom: 10px;
        font-weight: 500;
    }

    form input{
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #969696;
    }

  

`

export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    
    button{
        color: white;
        background: #D81C48;
        border: none;
        width: 100px;
        margin: 5px;
        padding: 10px;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
    }

    .update{
        background: #36B520;
    }

`