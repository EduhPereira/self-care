import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Background, Container } from "./styles";
import logo from "../../assets/self-care.png";
import loginImg from "../../assets/login.png";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useUser } from "../../providers/UserProvider";

export const Login = () => {
  const history = useHistory();
  const { setIsLoggedIn } = useUser();

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
    try {
      const response = await api.post("/sessions/", { username, password });
      const access = await response.data.access;
      toast.success("Sucesso ao entrar");
      const token = access;
      const decode = jwt_decode(token);
      const { user_id } = decode;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);
      localStorage.getItem(user_id);
      setIsLoggedIn(true);
      if (user_id !== 0) {
        history.push("/dashboard");
      } else {
        toast.error("Erro ao entrar na conta");
      }
    } catch (e) {
      toast.error("Erro ao entrar na conta");
    }
  };

  return (
    <Container>
      <Background>
        <img src={loginImg} />
      </Background>

      <section className="login">
        <img src={logo} />
        <h1>Entre com sua conta</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Usuário: <span>{errors.username?.message}</span>
          </label>
          <input type="text" {...register("username")} placeholder="Seu nome" />
          <label>
            Senha: <span>{errors.password?.message}</span>
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Sua senha"
          />
          <button type="submit">Entrar</button>
        </form>

        <p>Não possui conta?</p>
        <Link to="/signup">Cadastre-se</Link>
      </section>
    </Container>
  );
};
