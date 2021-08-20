import { Container, Buttons } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { useUser } from "../../providers/UserProvider";

export const ModalGoalsEdit = ({
  visible,
  setVisible,
  idGoal,
  titleModal,
  onSubmit,
}) => {
  const { token, id } = useUser();
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório."),
    difficulty: yup.string().required("Campo obrigatório."),
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

  const updateGoal = async ({ title, difficulty }) => {
    const response = await api.patch(
      `/goals/${idGoal}/`,
      { title, difficulty },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.warning("Hábito atualizado");
    setVisible(false);
  };

  return (
    <Container visible={visible}>
      <form
        onSubmit={
          titleModal === "Edite sua meta"
            ? handleSubmit(updateGoal)
            : handleSubmit(onSubmit)
        }
      >
        <h2>{titleModal}</h2>
        <label>Título:</label>
        <input type="text" {...register("title")} maxLength="25" />
        <label>Dificuldade:</label>
        <select name="difficulty" {...register("difficulty")}>
          <option value="">-- Dificuldade --</option>
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>
        <Buttons>
          {titleModal === "Edite sua meta" ? (
            <button className="update" type="submit">
              Atualizar
            </button>
          ) : (
            <button className="update" type="submit">
              Criar
            </button>
          )}
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </Buttons>
      </form>
    </Container>
  );
};
