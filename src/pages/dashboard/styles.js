import styled from "styled-components";

export const DesktopContainer = styled.div`
    width: calc(100vw - 70px);
    height: 100vh;
    margin: 0 0 0 70px;
    padding: 30px 60px;
`

export const MobileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;

    > h1 {
        margin-top: 10px;
    }
`

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const Card = styled.div`
    padding: 10px;
    width: 250px;
    margin-bottom: 10px;
    margin-right: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2), 0 -2px 10px rgba(0, 0, 0, 0.1);
`