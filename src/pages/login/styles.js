import styled from "styled-components";
import triangleTwo from "../../assets/triangle-two.png";
import triangleOne from "../../assets/triangle-one.png";

export const Container = styled.div`
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

  span {
    margin-left: 10px;
    color: red;
  }

  a {
    text-decoration: none;
    color: blue;
  }

  h1 {
    margin-bottom: 35px;
    margin-top: 19px;
  }

  .login img {
    margin-top: 28px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 285px;
    margin: auto;
  }

  form label {
    margin-bottom: 10px;
  }

  form button {
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
  }

  form input {
    width: 285px;
    height: 40px;
    margin-bottom: 13px;
    border-radius: 50px;
    border: 1px solid #969696;
    outline: none;
    padding-left: 15px;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    section {
      margin: auto;
    }
  }
`;

export const Background = styled.div`
  display: none;
  background: #041c78;

  ::after {
    position: absolute;
    width: 150px;
    height: 150px;
    background: url(${triangleTwo});
    background-size: 100%;
    content: "";
    top: 10px;
    right: 53%;
    transform: translateX(10%);
  }

  ::before {
    width: 150px;
    height: 150px;
    background: url(${triangleOne});
    background-size: 100%;
    content: "";
    position: absolute;
    bottom: 10px;
    left: 0;
    transform: translateX(10%);
  }

  @media (min-width: 768px) {
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 350px;
      height: 350px;
      margin-top: 0;
    }
  }

  @media (min-width: 1024px) {
    img {
      width: 400px;
      height: 400px;
    }
  }

  @media (min-width: 1440px) {
    img {
      width: 500px;
      height: 500px;
    }

    ::after {
      right: 52%;
      transform: translateX(10%);
    }
  }
`;
