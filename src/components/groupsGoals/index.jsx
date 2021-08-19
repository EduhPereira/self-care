import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { toast } from "react-toastify";
import { ModalGoalsEdit } from "../modalGoalsEdit";
import {
  Cards,
  Card,
  PreviousButton,
  NextButton,
  CreateGoal,
  Container,
  Icons,
} from "./styles";
import { FaEdit, FaCheck } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { NotFoundMsg } from "../notFoundMsg";

export const GroupGoals = ({ GroupId }) => {
  const [updater, setUpdater] = useState(0);
  const [goalsList, setGoalsList] = useState([]);
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(GroupId);
  const { id, token } = useUser();
  const [visible, setVisible] = useState(false);
  const [idGoal, setIdGoal] = useState(0);
  const [editGoal, setEditGoal] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [titleModal, setTitleModal] = useState("");

  useEffect(() => {
    api
      .get(`/goals/?group=${group}&page=${page}`)
      .then((response) => setGoalsList(response.data.results))
      .catch((e) => console.log(e.message));
  }, [page, updater]);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required("O Campo é Obrigatório"),
    difficulty: yup.string().required("O Campo é Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ title, difficulty }) => {
    const newGoal = {
      title: title,
      difficulty: difficulty,
      how_much_achieved: 0,
      group: group,
    };
    api
      .post("/goals/", newGoal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(toast.success("✅ Nova Meta Adicionada"))
      .catch((err) => toast.error(`❌ ${err}`));
    setVisible(false);
  };

  const handleDelete = (id) => {
    api
      .delete(`/goals/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(toast.warning("✔️ Meta Removida"))
      .catch((err) => toast.error(`❌ ${err}`));
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const checkGoal = async (value, id) => {
    const response = await api.patch(
      `/goals/${id}/`,
      { how_much_achieved: value + 1, achieved: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.info("Hábito feito");
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleEdit = (id) => {
    setIdGoal(id);
    setTitleModal("Edite sua meta");
    setVisible(true);
  };

  const openNewGoal = () => {
    setTitleModal("Crie sua meta");
    setVisible(true);
  };

  return (
    <>
      <Container>
        <ModalGoalsEdit
          visible={visible}
          setVisible={setVisible}
          idGoal={idGoal}
          titleModal={titleModal}
          onSubmit={onSubmit}
        />

        <CreateGoal>
          <button onClick={openNewGoal}>Criar nova meta</button>
        </CreateGoal>
        <Cards>
          <h1>Metas</h1>
          {goalsList.length === 0 ? (
            <NotFoundMsg>Você não criou nenhuma meta</NotFoundMsg>
          ) : (
            <>
              {goalsList.map((goal) => {
                return (
                  <Card key={goal.id}>
                    <div>
                      <p className="Title">
                        <span className="Goal">Título</span>
                        <p>{goal.title}</p>
                      </p>
                    </div>
                    <p className="Difficulty">
                      <span>Dificuldade:</span> {goal.difficulty}
                    </p>
                    <p className="Achievements">
                      <span>Dias conquistados: </span>
                      {goal.how_much_achieved}
                    </p>
                    <Icons>
                      <div onClick={() => handleEdit(goal.id)}>
                        <FaEdit className="Edit" />
                        <span>Editar</span>
                      </div>
                      <div onClick={() => handleDelete(goal.id)}>
                        <RiDeleteBin2Line className="Delete" />
                        <span>Excluir</span>
                      </div>
                      <div
                        onClick={() =>
                          checkGoal(goal.how_much_achieved, goal.id)
                        }
                      >
                        <FaCheck className="Check" />
                        <span>Concluir</span>
                      </div>
                    </Icons>
                  </Card>
                );
              })}
            </>
          )}
        </Cards>
      </Container>

      <PreviousButton onClick={handlePrevious}>Anterior</PreviousButton>
      <NextButton onClick={handleNext}>Próxima</NextButton>
    </>
  );
};
