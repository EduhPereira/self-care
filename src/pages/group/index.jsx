import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupActivities } from "../../components/groupsActivities";
import { api } from "../../services/api";
import { Button, Container } from "../groups/styles";
import { SideNavigationMenu } from "../../components/sideNavigationMenu";
import { BottomNavigationMenu } from "../../components/bottomNavigationMenu";
import { GroupGoals } from "../../components/groupsGoals";
import { useContext } from 'react';
import { MenuItemFocusContext } from '../../providers/menuItemFocus';
import { User } from "../../components/user";
import { EditGroupButton } from "./styles";
import { ModalEditGroup } from "../../components/modalEditGroup";

export const Group = () => {
  const params = useParams();
  const [goalsList, setGoalsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false)
  const [group, setGroup] = useState({})

  const { setHomeFocus, setListFocus, setGroupFocus } = useContext(MenuItemFocusContext);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // const getSpecificGroup = () => {
  //   api
  //     .get(`/groups/${params.id}/`)
  //     .then(res => setGroup(res.data))
  // }

  const getActivities = () => {
    api
      .get(`activities/?group=${params.id}`)
      .then((res) => setActivitiesList(res.data.results))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    getActivities();
  }, []);

  useEffect(() => {
    setHomeFocus(false);
    setListFocus(false);
    setGroupFocus(true);
  }, []);

  // useEffect(()=>{
  //   return getSpecificGroup();    
  // },[])

  return (
    <>
      {isMobile ? (
        <BottomNavigationMenu />
      ) : (
        <SideNavigationMenu />
      )}
      <ModalEditGroup groupId={params.id} showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <section>
          <Button onClick={() => setShowList(true)} showList={showList}>
            Metas
          </Button>
          <Button onClick={() => setShowList(false)} showList={!showList}>
            Atividades
          </Button>
          <div />
          <EditGroupButton onClick={() => setShowModal(true)}>Editar Grupo</EditGroupButton>
          <div />
          <Link to="/groups">Voltar</Link>
        </section>
        <section>
          {showList ? (
            <GroupGoals GroupId={params.id} />
          ) : (
            <GroupActivities groupId={params.id} />
          )}
        </section>
      </Container>
    </>
  );
};
