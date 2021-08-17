import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { useHistory } from "react-router-dom";
import { Background, Container } from "./style";
import logo from "../../assets/self-care.png";
import loginImg from "../../assets/signup.svg";
// import { toast } from "react-toastify";

export const Signup = () => {
  // contrução do objeto e verificação
  const schema = yup.object().shape({
    username: yup.string().required("Campo Obrigatório."), // regex nome sem caractere especial e spaço
    email: yup.string().email("Email Inválido").required("Campo Obrigatório."),
    password: yup
      .string()
      .required("Campo Obrigatório.")
      .min(6, "Mínimo de 6 dígitos"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas Diferentes")
      .required("Campo Obrigatório."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  // requisição de cadastro
  const onSubmit = ({ username, email, password }) => {
    // formando objeto com a penas as informações necessárias para a api
    const user = { username, email, password };

    api
      .post("/users/", user)
      .then((res) => {
        console.log(res);
        return history.push("/login");
      })
      .catch((err) => console.log(err, user));
  };

  return (
    <Container>
      <Background>
        <img src={loginImg} />
      </Background>
      <section className="login">
        <header>
          <img src={logo} />
          <p>Crie sua Conta</p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">
            Nome <span>{errors.username && errors.username.message}</span>
          </label>
          <input type="text" {...register("username")} />

          <label htmlFor="email">
            Email <span>{errors.email?.message}</span>
          </label>
          <input type="text" {...register("email")} />

          <label htmlFor="password">
            Senha <span>{errors.password?.message}</span>
          </label>
          <input type="text" {...register("password")} />

          <label htmlFor="passwordConfirm">
            Confirmar Senha <span>{errors.passwordConfirm?.message}</span>
          </label>
          <input type="text" {...register("passwordConfirm")} />

          <button type="submit">Enviar</button>
          <p>
            Já tem uma conta?{" "}
            <span onClick={() => history.push("/login")}>Entre</span>
          </p>
        </form>
      </section>
    </Container>
  );
};
