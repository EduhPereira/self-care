import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { Buttons, Container } from "./styles";

export const ModalActivities = ({
  setIsVisible,
  visible,
  activity,
  titleModal,
  activityFunc,
  groupId,
}) => {
  const { id, token } = useUser();
  const [date, setDate] = useState({});
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório!"),
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
    setIsVisible(false);
  };

  const onChange = (date) => {
    setDate(date);
  };

  const createActivity = async ({ title }, e) => {
    const newActivity = {
      title: title,
      realization_time: date,
      group: groupId,
    };
    const response = await api.post(`/activities/`, newActivity, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("✅ Atividade criada com sucesso!");
    e.target.reset();
    activityFunc();
    setIsVisible(false);
  };

  // Atualizar atividades
  const updateActivity = async (data, e) => {
    const id = activity;
    const response = await api.patch(`activities/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("✅ Atividade criada com sucesso!");
    e.target.reset();
    activityFunc();
    setIsVisible(false);
  };

  return (
    <Container visible={visible}>
      <form
        onSubmit={
          titleModal === "Edite sua atividade"
            ? handleSubmit(updateActivity)
            : handleSubmit(createActivity)
        }
      >
        <h2>{titleModal}</h2>
        <label>Título:</label>
        <input type="text" name="title" {...register("title")} />
        <DatePicker
          format="DD-MM-YYYY HH:mm"
          onChange={onChange}
          size={"small"}
          style={{
            border: "none",
          }}
          placeholder="Data limite"
        ></DatePicker>
        <Buttons>
          {titleModal === "Edite sua atividade" ? (
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
