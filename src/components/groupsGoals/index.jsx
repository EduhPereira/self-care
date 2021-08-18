import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { toast } from "react-toastify";

export const GroupGoals = ({ GroupId }) => {
  const [updater, setUpdater] = useState(0);
  const [goalsList, setGoalsList] = useState([]);
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(GroupId);
  const { id, token } = useUser();

  useEffect(() => {
    api
      .get(`/goals/?group=${group}&page=${page}`)
      .then((response) => setGoalsList(response.data.results))
      .catch((e) => console.log(e.message));
  }, [page, updater]);

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
      .then(toast.success("Nova Meta Adicionada"))
      .catch();
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <>
      <h2>Adicionar uma nova meta</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Título: <span>{errors.title?.message}</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Dê um título para a meta"
          {...register("title")}
        />

        <label>
          Dificuldade: <span>{errors.difficulty?.message}</span>
        </label>
        <select name="difficulty" {...register("difficulty")}>
          <option selected value="Fácil">
            Fácil
          </option>
          <option value="Medium">Medium</option>
          <option value="Difícil">Difícil</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      <h2>Metas do Grupo</h2>
      {goalsList.map((goal) => {
        return (
          <div key={goal.id}>
            <div>{goal.title}</div>
            <div>{goal.difficulty}</div>
            <div>{goal.how_much_achieved}</div>
            <div>
              <button>Editar</button>
              <button>Deletar</button>
              <button>Check</button>
            </div>
          </div>
        );
      })}
      <button onClick={handlePrevious}>Anterior</button>
      <button onClick={handleNext}>Próxima</button>
    </>
  );
};
