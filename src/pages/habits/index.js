import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { Container, ContentCategory, Cards, Card, Icons } from "./styles";
import { FaCheck, FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Modal } from "../../components/Modal";
import { ModalHabits } from "../../components/modalHabits";

export const Habits = () => {
  const { id, token } = useUser();
  const [habitsList, setHabitsList] = useState([]);
  const [habitEdit, setHabitEdit] = useState([]);
  const [visible, setVisible] = useState(false)
  const [titleModal, setTitleModal] = useState('')

  const habits = async () => {
    const response = await api.get("/habits/personal/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        completed: false,
      },
    });

    setHabitsList(response.data);
  };

  useEffect(() => {
    habits();
  }, []);

  const deleteHabit = async (id) => {
    const response = await api.delete(`/habits/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    habits();
  };

  const checkHabit = async (value, id) => {
    const response = await api.patch(
      `/habits/${id}/`,
      { how_much_achieved: value + 1, achieved: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    habits();
  };

  const openUpdateHabit = (habit) => {
    setTitleModal('Edite seu hábito:')
    setVisible(true)
    setHabitEdit(habit);
  };

  const openNewHabit = () => {
    setTitleModal('Crie seu hábito:')
    setVisible(true)
  }

  

  return (
    <Container>
      <ModalHabits titleModal={titleModal} habitsF={habits} setVisible={setVisible} visible={visible} habit={habitEdit}/>
      <button onClick={openNewHabit}>Novo Habito</button>
      <ContentCategory>
        <h3>Categorias</h3>
      </ContentCategory>

      <Cards>
        {habitsList.map((el) => {
          return (
            <Card>
              <p className="Title">{el.title}</p>
              <p>Dificuldade: {el.difficulty}</p>
              <p>Categoria: {el.category}</p>
              <Icons>
                <RiDeleteBin2Line
                  className="Delete"
                  onClick={() => deleteHabit(el.id)}
                />
                <FaEdit className="Edit" onClick={() => openUpdateHabit(el)} />
                <FaCheck
                  className="Check"
                  onClick={() => checkHabit(el.how_much_achieved, el.id)}
                />
              </Icons>
            </Card>
          );
        })}
      </Cards>
    </Container>
  );
};

/*
<select name="select">
        {test.results.map((el)=>{
                return <option key={el.category} value={el.category}>{el.category}</option>
            })}
          
        </select>*/
