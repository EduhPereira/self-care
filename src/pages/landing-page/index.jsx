import { useHistory } from "react-router";
import {
  Header,
  Logo,
  Buttons,
  SigninBtn,
  SignupBtn,
  AboutSection,
  FeaturesSection,
  CreatorsSection,
  CreatorCard,
} from "./styles";
import HealthyHabit from "../../assets/images/healthy-habit.svg";
import Habits from "../../assets/images/habits.svg";
export const LandingPage = () => {
  //useHistory ainda não setado aos botões no evento de onClick para redirecionamento a outra pagina
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
      <AboutSection>
        <img src={HealthyHabit} alt="" />
        <div>
          <h2>Precisando de uma mãozinha na hora de gerenciar seus hábitos?</h2>
          <p>
            A SelfCare pode ser a escolha certa para você definir novas metas e
            atividades. Simples e Intuitivo é o nosso lema
          </p>
          <button>comece agora</button>
        </div>
      </AboutSection>
      <FeaturesSection>
        <div>
          <h2>Crie, Gerencie, e Encontre Pessoas com Gostos em Comum</h2>
          <p>
            Isso mesmo, a SelfCare não se trata apenas de um gerenciador, mas
            também um local para conhecer e participar de comunidades que
            compartilham de metas e objetivos semelhantes, afinal, nada melhor
            para a motivação do que um grupo engajado não é?!
          </p>
        </div>
        <img src={Habits} alt="" />
      </FeaturesSection>
      <CreatorsSection>
        <CreatorCard>
          <img
            src="https://ca.slack-edge.com/TQZR39SET-U01KKF0G3C2-6cb8796455a5-512"
            alt=""
          />
          <h3>Eduardo Pereira</h3>
        </CreatorCard>

        <CreatorCard>
          <img
            src="https://ca.slack-edge.com/TQZR39SET-U01RU9T4KFY-05084f65b370-512"
            alt=""
          />
          <h3>Estevan Martins</h3>
        </CreatorCard>

        <CreatorCard>
          <img
            src="https://ca.slack-edge.com/TQZR39SET-U01TB4P776C-3483d066e79b-512"
            alt=""
          />
          <h3>Odair Lopes</h3>
        </CreatorCard>

        <CreatorCard>
          <img
            src="https://ca.slack-edge.com/TQZR39SET-U01RRUA94J3-89ca0732f739-512"
            alt=""
          />
          <h3>Douglas Filipe</h3>
        </CreatorCard>

        <CreatorCard>
          <img
            src="https://ca.slack-edge.com/TQZR39SET-U01QNNDLD6E-de6d71dd7a03-512"
            alt=""
          />
          <h3>Renato Barbosa</h3>
        </CreatorCard>
      </CreatorsSection>
    </div>
  );
};
