import { useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { Container, Buttons } from "./styles";
import { api } from "../../services/api";

export const ModalHabits = ({
  habitsF,
  visible,
  setVisible,
  habit,
  titleModal,
}) => {
  const { token, id } = useUser();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [frequency, setFrequency] = useState("");

  const closeModal = () => {
    setVisible(false);
  };

  const updateHabit = async (value) => {
    const { id } = habit;
    const response = await api.patch(
      `/habits/${id}/`,
      {
        title: title,
        category: category,
        difficulty: difficulty,
        frequency: frequency,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await habitsF();
    setVisible(false);
    setCategory("");
    setTitle("");
    setDifficulty("");
    setFrequency("");
  };

  const createHabit = async () => {
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

    await habitsF();
    setVisible(false);
    setCategory("");
    setTitle("");
    setDifficulty("");
    setFrequency("");
  };

  return (
    <Container visible={visible}>
      <form>
        <h2>{titleModal}</h2>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Categoria:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label>Dificuldade:</label>
        <input
          type="text"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <label>Frequência:</label>
        <input
          type="text"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <Buttons>
          {titleModal === "Edite seu hábito:" ? (
            <button
              onClick={() => updateHabit(habit)}
              className="update"
              type="button"
            >
              Atualizar
            </button>
          ) : (
            <button onClick={createHabit} className="update" type="button">
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
