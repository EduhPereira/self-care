import { useState, useEffect } from "react";
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { DatePicker, Space } from "antd";
import { Container } from "./styles";
import "antd/dist/antd.css";
import { UseCurrentGroup } from "../../providers/currentGroup/currentGroup";

export const GroupActivities = () => {
  const [activityList, setActivityList] = useState([]);
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(33);
  const { id, token } = useUser();
  const { RangePicker } = DatePicker;
  const [date, setDate] = useState({});

  useEffect(() => {
    api
      .get(`activities/?group=${group}&page=${page}`)
      .then((response) => setActivityList(response.data.results))
      .catch((err) => console.log(err));
  }, [page]);

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const createActivity = ({ title, date }) => {
    const newActivity = {
      title: title,
      realization_time: date,
      group: group,
    };
    api
      .post("/activities/", newActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const activity = response.data;
        setActivityList([...activityList, activity]);
        console.log("criou!");
      })
      .catch((err) => console.log(err));
  };

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(createActivity)}>
        <label>
          Título <span>{errors.title?.message}</span>
        </label>
        <input
          placeholder="Título da atividade"
          type="text"
          name="title"
          {...register("title")}
        />
        <DatePicker showTime onChange={onChange} />

        <button className="button_group" type="submit">
          Adicionar atividade
        </button>
      </form>
      <h1>Atividades</h1>
      {activityList.map((activity) => {
        return (
          <div>
            <p>{activity.title}</p>
            <p>{activity.realization_time}</p>
            <button>Editar</button>
            <button>Deletar</button>
          </div>
        );
      })}
    </Container>
  );
};
