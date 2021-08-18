import { useUser } from "../../providers/UserProvider";
import { Container, Buttons } from "./styles";
import { api } from "../../services/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useState } from "react";

export const UserModal = ({
  userName,
  visible,
  setVisible,
}) => {
  const { token, id } = useUser();

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const closeModal = () => {
    setVisible(false);
  };

  const updateUser = async ({ username }, e) => {
    const response = await api.patch(`/users/${id}/`, {username}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await userName()
    setVisible(false)
    e.target.reset();
  };

  


  return (
    <Container visible={visible}>
      <form onSubmit={handleSubmit(updateUser)}>
        <h2>Atualize sua conta:</h2>
        <label>Nome de usuário:</label>
        <input type="text" {...register("username")} />
        <Buttons>
          <button className="update" type="submit">
            Atualizar
          </button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </Buttons>
      </form>
    </Container>
  );
};
