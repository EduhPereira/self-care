import { useHistory } from "react-router";
import { Header, Logo, Buttons, SigninBtn, SignupBtn } from "./styles";
export const LandingPage = () => {
  const history = useHistory();
  return (
    <div>
      <Header>
        <Logo>SelfCare</Logo>
        <Buttons>
          <SigninBtn>Entrar</SigninBtn>
          <SignupBtn>Cadastrar</SignupBtn>
        </Buttons>
      </Header>
      <section>Sobre a Plataforma</section>
      <section>Sobre as Features</section>
      <section>Criadores</section>
    </div>
  );
};
