import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";

export const GroupGoals = () => {
  const [goalsList, setGoalsList] = useState([]);
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(4);
  const { id, token } = useUser();

  //Busca das metas já existentes no grupo
  useEffect(() => {
    api
      .get(`/goals/?group=${group}&page=${page}`)
      .then((response) => setGoalsList(response.data.results))
      .catch((e) => console.log(e.message));
  }, [page]);

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

  //Requisição para a adição de uma nova meta
  const onSubmit = ({ title, difficulty }) => {
    const newGoal = {
      title: title,
      difficulty: difficulty,
      how_much_achieved: 100,
      group: group,
    };
    api
      .post("/goals/", newGoal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then() //Espaço para inserir um toast sinalizando o sucesso ao adicionar uma nova meta
      .catch(); //Tratamento de Erro ao adicionar uma nova meta
  };

  //Funções para paginação das metas
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

      {/* listagem de metas já criadas, porém sem folha de estilo ou componentes para cada meta */}
      <h2>Metas do Grupo</h2>
      {goalsList.map((goal) => {
        return (
          <div>
            <span>{goal.title}</span>
            <span>{goal.difficulty}</span>
            <span>{goal.how_much_achieved}</span>
            <button>Atualizar / Editar</button>
            <button>Deletar</button>
          </div>
        );
      })}
      <button onClick={handlePrevious}>Anterior</button>
      <button onClick={handleNext}>Próxima</button>
    </>
  );
};
