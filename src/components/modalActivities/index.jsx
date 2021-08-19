import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { DatePicker, Space } from "antd";
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
    reslver: yupResolver(schema),
  });

  const closeModal = () => {
    setIsVisible(false);
  };

  const onChange = (date, dateString) => {
    /* date = format(parseIso()) */
    setDate(dateString);
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
    toast.success("🦄 Atividade criada com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    toast.success("🦄 Atividade editada com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
        <Space direction="vertical" size={12}>
          <DatePicker showTime onChange={onChange}></DatePicker>
        </Space>
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
