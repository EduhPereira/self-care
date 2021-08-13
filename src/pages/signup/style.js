import styled from "styled-components";

export const Container = styled.main`
    header {
        h1 {
            font-weight: normal;
            color: #CE1873;
        }
        p {
            font-weight: 700;
            font-size: 24px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 10px 36px;

        input {
            margin: 10px 0;
            height: 42px;
            border-radius: 10px;
        }

        label {
            font-size: 20px;
            font-weight: 500;

            span {
                color: red;
                font-size: 12px;
            }
        }

        button {
            width: 229px;
            height: 52px;
            font-size: 25px;
            font-weight: 500;
            margin: 0 auto;
        }

        span {
            cursor: pointer;
            color: blue;
        }
    }
`