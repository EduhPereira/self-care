import React from "react";
import {
  ModalDiv,
  Container,
  ContainerButtons,
  ButtonUpdate,
  ButtonCancel,
} from "./styles";

export const Modal = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) {
      onClose();
    }
  };

  return (
    <>
      <ModalDiv id={id} onClick={handleOutsideClick}>
        <Container>
          <>{children}</>
          <ContainerButtons>
            <ButtonUpdate>Atualizar</ButtonUpdate>
            <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
          </ContainerButtons>
        </Container>
      </ModalDiv>
    </>
  );
};
