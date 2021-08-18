import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: -15px;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(1, 1, 1, 0.7);
  font-family: "Poppins", sans-serif;
  transition: 0.2s;
  visibility: ${(props) => `${props.visible ? "visible" : "hidden"}`};
  opacity: ${(props) => `${props.visible ? "1" : "0"}`};
  form {
    transition: 0.2s;
    width: 270px;
    transform: ${(props) =>
      `${props.visible ? "translateY(0%)" : "translateY(50%)"}`};
    background: white;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 15px;
  }

  form h2 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 500;
  }

  form label {
    margin-bottom: 10px;
    font-weight: 500;
  }

  form input {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #969696;
  }

  form select {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #969696;
    background: white;
  }

  @keyframes modal {
    from {
      transform: translateY(50%);
      opacity: 0;
    }
  }

  
`;

export const Buttons = styled.div`
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
