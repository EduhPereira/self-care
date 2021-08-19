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

export const Group = () => {
  const params = useParams();
  const [goalsList, setGoalsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { setHomeFocus, setListFocus, setGroupFocus } = useContext(MenuItemFocusContext);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
  };

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

  return (
    <>
      {isMobile ? (
        <BottomNavigationMenu/>
      ) : (
        <SideNavigationMenu />
      )}
      <Container>
        <section>
          <Button onClick={() => setShowList(true)} showList={showList}>
            Metas
          </Button>
          <Button onClick={() => setShowList(false)} showList={!showList}>
            Atividades
          </Button>
          <div></div>
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
