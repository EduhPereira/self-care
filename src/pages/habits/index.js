import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { Container, ContentCategory, Cards, Card, Icons } from "./styles";
import { FaCheck, FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ModalHabits } from "../../components/modalHabits";
import { CircularProgress } from "@material-ui/core";
import { NotFoundMsg } from "../../components/notFoundMsg";

export const Habits = () => {
  const { id, token } = useUser();
  const [habitsList, setHabitsList] = useState([]);
  const [habitListFilter, sethabitListFilter] = useState([]);
  const [habitEdit, setHabitEdit] = useState([]);
  const [visible, setVisible] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState("Todas");

  const habits = async () => {
    const response = await api.get("/habits/personal/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
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
    setTitleModal("Edite seu hábito:");
    setVisible(true);
    setHabitEdit(habit);
  };

  const openNewHabit = () => {
    setTitleModal("Crie seu hábito:");
    setVisible(true);
  };

  const selectCategory = (event) => {
    setControl(event.target.value);
    let filterList = habitsList.filter((el) => {
      if (el.category.includes(event.target.value)) {
        return el;
      }
    });

    sethabitListFilter(filterList);
  };

  console.log(control);

  console.log(habitListFilter);

  return (
    <Container>
      <button onClick={openNewHabit}>Crie seu hábito:</button>
      <ModalHabits
        habitsF={habits}
        setVisible={setVisible}
        visible={visible}
        habit={habitEdit}
        titleModal={titleModal}
      />
      <ContentCategory>
        <h3>Categorias</h3>

        <select onChange={selectCategory}>
          <option selected value="Todas">
            Todas
          </option>
          <option value="Saúde">Saúde</option>
          <option value="Música">Música</option>
          <option value="Aventura">Aventura</option>
          <option value="Estudos">Estudos</option>
          <option value="Religão">Religão</option>
          <option value="Esporte">Esporte</option>
        </select>
      </ContentCategory>

      {loading ? (
        <CircularProgress />
      ) : (
        <Cards>
          {control === "Todas" ? (
            <>
              {habitsList.map((el) => {
                return (
                  <Card>
                    <p className="Title"><span>Hábito: </span>{el.title}</p>
                    <p className="Difficulty"><span>Dificuldade:</span> {el.difficulty}</p>
                    <p className="Category"><span>Categoria:</span> {el.category}</p>
                    <Icons>
                      <RiDeleteBin2Line
                        className="Delete"
                        onClick={() => deleteHabit(el.id)}
                      />
                      <FaEdit
                        className="Edit"
                        onClick={() => openUpdateHabit(el)}
                      />
                      <FaCheck
                        className="Check"
                        onClick={() => checkHabit(el.how_much_achieved, el.id)}
                      />
                    </Icons>
                  </Card>
                );
              })}
            </>
          ) : (
            <>
              {habitListFilter.length === 0 ? (
                <NotFoundMsg>Não existe hábitos nesta categoria</NotFoundMsg>
              ) : (
                <>
                  {habitListFilter.map((el) => {
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
                          <FaEdit
                            className="Edit"
                            onClick={() => openUpdateHabit(el)}
                          />
                          <FaCheck
                            className="Check"
                            onClick={() =>
                              checkHabit(el.how_much_achieved, el.id)
                            }
                          />
                        </Icons>
                      </Card>
                    );
                  })}
                </>
              )}
            </>
          )}
        </Cards>
      )}
    </Container>
  );
};
