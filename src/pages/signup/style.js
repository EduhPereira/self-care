import styled from "styled-components";

export const Container = styled.main`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  font-family: "Poppins", "sans-serif";
  color: #212121;
  font-size: 17px;
  display: flex;
  justify-content: center;
  margin: auto;
  height: 100vh;
  text-align: center;

  .signup {
    @media(min-width: 768px) {
      width: 50%;
      margin: auto;
    }

    header {
      img {
        margin-top: 28px;
      }
      p {
        margin: 19px 0 35px;
        font-weight: 700;
        font-size: 24px;
        text-align: center;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 285px;
      margin: auto;

      input {
        width: 285px;
        height: 40px;
        margin-bottom: 13px;
        border-radius: 50px;
        border: 1px solid #969696;
        outline: none;
        padding-left: 15px;
        font-size: 1rem;
      }

      label {
        margin-bottom: 10px;

        span {
          color: red;
          font-size: 12px;
        }
      }

      button {
        margin: auto;
        background: #109358;
        border: none;
        color: white;
        font-size: 25px;
        margin-top: 19px;
        width: 229px;
        height: 52px;
        border-radius: 50px;
        margin-bottom: 27px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        :hover {
          background-color: #93b32b;
        }
      }

      span {
        cursor: pointer;
        color: blue;
      }

      p {
        align-self: center;
      }
    }
  }
`;