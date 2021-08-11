import { api } from "../../services/api";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Background, Container } from "./styles";
import logo from "../../assets/self-care.png";
import loginImg from '../../assets/login.png'
import { Link } from "react-router-dom";

export const Login = () => {
  const schema = yup.object().shape({
    username: yup.string().required("*Campo obrigatório"),
    password: yup.string().required("*Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, password }) => {
    const response = await api.post("/sessions/", { username, password });
    console.log(response.data.access);
  };

  return (
    <Container>
      <Background>
        <img src={loginImg}/>
      </Background>

      <section className="login">
        <img src={logo} />
        <h1>Entre com sua conta</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Usuário: <span>{errors.username?.message}</span>
          </label>
          <input type="text" {...register("username")} placeholder="Seu nome"/>
          <label>
            Senha: <span>{errors.password?.message}</span>
          </label>
          <input type="password" {...register("password")} placeholder="Sua senha"/>
          <button type="submit">Entrar</button>
        </form>

        <p>Não possui conta?</p>
        <Link>Cadastre-se</Link>
      </section>
    </Container>
  );
};
