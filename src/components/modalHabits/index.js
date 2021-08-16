import { useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { Container, Buttons } from "./styles";
import { api } from "../../services/api";

export const ModalHabits = ({ habitsF, visible, setVisible, habit }) => {
  const { token } = useUser();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [frequency, setFrequency] = useState("");
  const [modalClose, setModalClose] = useState();
  const closeModal = () => {
    setVisible(false);
  };

  const updateHabit = async (value) => {
    console.log(value);
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

    habitsF();
    setVisible(false) 
  };

  return (
    <Container visible={visible}>
      <form>
        <h2>Edite seu hábito:</h2>
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
          <button
            onClick={() => updateHabit(habit)}
            className="update"
            type="button"
          >
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
