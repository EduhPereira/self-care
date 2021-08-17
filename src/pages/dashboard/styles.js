import styled from "styled-components";

export const DesktopContainer = styled.div`
    width: calc(100vw - 70px);
    height: 100vh;
    margin: 0 0 0 70px;
    padding: 30px 60px;
`

export const CardsContainer = styled.div`
    display: flex;
`

export const Card = styled.div`
    padding: 10px;
    width: 250px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2), 0 -2px 10px rgba(0, 0, 0, 0.1);
`