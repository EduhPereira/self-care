import styled from "styled-components";

export const Background = styled.div`
    display: flex;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0;
    background-color: white;
    height: 60px;
    width: calc(100vw - 40px);
    margin: 30px 20px;
    border-radius: 10px;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2), 1px -2px 10px rgba(0, 0, 0, 0.1);
`

export const IconButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 8px;
`

export const FloatingIconButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #097A52;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    bottom: 30px;
`

export const Marker = styled.div`
    position: relative;
    bottom: 8px;
    width: calc(100vw/10);
    height: 5px;
    background-color: #097A52;
    border-radius: 10px;
`