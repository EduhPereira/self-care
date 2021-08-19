import { useState, useEffect } from "react";
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Container, Icons } from "./styles";
import "antd/dist/antd.css";
import { SideNavigationMenu } from "../../components/sideNavigationMenu";
import { BottomNavigationMenu } from "../../components/bottomNavigationMenu";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ModalActivities } from "../modalActivities";

export const GroupActivities = ({ groupId }) => {
  const [activityList, setActivityList] = useState([]);
  const [editActivity, setEditActivity] = useState([]);
  const [titleModal, setTitleModal] = useState("");
  const [page, setPage] = useState(1);
  const { id, token } = useUser();
  const [date, setDate] = useState({});
  const [visible, setIsVisible] = useState(false);

  const activities = async () => {
    const response = await api.get(
      `activities/?group=${groupId}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setActivityList(response.data.results);
  };

  // Deletando atividades
  const deleteActivity = (activityId) => {
    api
      .delete(`activities/${activityId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) =>
          setActivityList(
            activityList.filter((activity) => activity.id !== activityId)
          ),
        toast.success("🦄 Atividade deletada com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) =>
        toast.error(`${err}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    activities();
  };
  const openNewActivity = () => {
    setTitleModal("Crie sua atividade");
    setIsVisible(true);
  };

  const openUpdateActivity = (activity) => {
    setTitleModal("Edite sua atividade");
    setIsVisible(true);
    setEditActivity(activity);
  };

  return (
    <>
      <ModalActivities
        activityFunc={activities}
        setIsVisible={setIsVisible}
        visible={visible}
        activity={editActivity}
        titleModal={titleModal}
        groupId={groupId}
        activityList={activityList}
        setActivityList={setActivityList}
      />
      <button onClick={openNewActivity}>Criar nova atividade</button>
      <Container>
        <h1>Atividades</h1>
        {activityList.map((activity, index) => {
          return (
            <div key={index}>
              <p>{activity.id}</p>
              <p>{activity.title}</p>
              <p>{activity.realization_time}</p>
              <Icons>
                <FaEdit
                  className="Edit"
                  onClick={() => openUpdateActivity(activity.id)}
                />
                <RiDeleteBin2Line
                  className="Delete"
                  onClick={() => deleteActivity(activity.id)}
                />
              </Icons>
            </div>
          );
        })}
      </Container>
    </>
  );
};
