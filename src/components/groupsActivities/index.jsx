import { useState, useEffect } from "react";
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Icons, Card, Cards, CreateActivity } from "./styles";
import "antd/dist/antd.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ModalActivities } from "../modalActivities";
import { NotFoundMsg } from "../notFoundMsg";

export const GroupActivities = ({ groupId }) => {
  const [activityList, setActivityList] = useState([]);
  const [editActivity, setEditActivity] = useState([]);
  const [titleModal, setTitleModal] = useState("");
  const [page, setPage] = useState(1);
  const { id, token } = useUser();
  const [visible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Obtendo atividades da API
  const activities = async () => {
    const response = await api
      .get(`activities/?group=${groupId}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => toast.error(`❌, ${err}`));
    const newActivity = response.data.results.map((activity) => ({
      ...activity,
      realization_time: new Date(activity.realization_time).toLocaleString(
        "pt-BR"
      ),
    }));
    setActivityList(newActivity);
  };

  // Deletando atividades da API
  const deleteActivity = (activityId) => {
    api
      .delete(`activities/${activityId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (_) =>
          setActivityList(
            activityList.filter((activity) => activity.id !== activityId)
          ),
        toast.success("✅ Atividade deletada com sucesso!")
      )
      .catch((err) => toast.error(`❌ ${err}`));
    activities();
  };

  useEffect(() => {
    activities();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
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
      <Container>
        <ModalActivities
          activityFunc={activities}
          setIsVisible={setIsVisible}
          visible={visible}
          activity={editActivity}
          titleModal={titleModal}
          groupId={groupId}
        />

        <CreateActivity>
          <button onClick={openNewActivity}>Criar nova atividade</button>
        </CreateActivity>

        <Cards>
          <h1>Atividades</h1>
          {activityList.length === 0 ? (
            <NotFoundMsg>Você não criou nenhuma atividade</NotFoundMsg>
          ) : (
            <>
              {activityList.map((activity, index) => {
                return (
                  <Card>
                    <div key={index}>
                      <p className="Title">
                        <span className="Activity">Título</span>
                        <p>{activity.title}</p>
                      </p>
                      <p className="Data">
                        <span>Data:</span> {activity.realization_time}
                      </p>
                      <Icons>
                        <div onClick={() => openUpdateActivity(activity.id)}>
                          <FaEdit className="Edit" />
                          <span>Editar</span>
                        </div>
                        <div onClick={() => deleteActivity(activity.id)}>
                          <RiDeleteBin2Line className="Delete" />
                          <span>Excluir</span>
                        </div>
                      </Icons>
                    </div>
                  </Card>
                );
              })}
            </>
          )}
        </Cards>
      </Container>
    </>
  );
};
