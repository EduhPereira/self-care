import { useUser } from "../../providers/UserProvider";
import { Container, Buttons } from "./styles";
import { api } from "../../services/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

export const ModalHabits = ({
  habitsF,
  visible,
  setVisible,
  habit,
  titleModal,
}) => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório."),
    difficulty: yup.string().required("Campo obrigatório."),
    frequency: yup.string().required("Escolha uma opção."),
    category: yup.string().required("Escolha uma opção."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { token, id } = useUser();

  const closeModal = () => {
    setVisible(false);
  };

  const updateHabit = async (dados, e) => {
    console.log(dados);
    const { id } = habit;
    const response = await api.patch(`/habits/${id}/`, dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    habitsF();
    setVisible(false);
    toast.success('Sucesso ao editar hábito!')
    e.target.reset()
  };

  const createHabit = async ({ title, category, difficulty, frequency }, e) => {
    const response = await api.post(
      `/habits/`,
      {
        title: title,
        category: category,
        difficulty: difficulty,
        frequency: frequency,
        achieved: false,
        how_much_achieved: 0,
        user: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    habitsF();
    setVisible(false);
    toast.success('Sucesso ao criar o hábito!')
    e.target.reset()
  };

  return (
    <Container visible={visible}>
      <form
        onSubmit={
          titleModal === "Edite seu hábito:"
            ? handleSubmit(updateHabit)
            : handleSubmit(createHabit)
        }
      >
        <h2>{titleModal}</h2>
        <label>Título:</label>
        <input type="text" {...register("title")} maxLength="25"/>
        <label>Categoria:</label>
        <select name="category" {...register("category")}>
          <option value="">--Escolha uma categoria--</option>
          <option value="Saúde">Saúde</option>
          <option value="Música">Música</option>
          <option value="Aventura">Aventura</option>
          <option value="Estudos">Estudos</option>
          <option value="Religão">Religão</option>
          <option value="Esporte">Esporte</option>
        </select>
        <label>Dificuldade:</label>
        <select name="difficulty" {...register("difficulty")}>
          <option value="">-- Dificuldade --</option>
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>
        <label>Frequência:</label>
        <input type="text" {...register("frequency")} maxLength="25"/>
        <Buttons>
          {titleModal === "Edite seu hábito:" ? (
            <button className="update" type="submit">
              Atualizar
            </button>
          ) : (
            <button className="update" type="submit">
              Enviar
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
