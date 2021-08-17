import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api"
import { Button, Container } from "../groups/styles";
import { SideNavigationMenu } from '../../components/sideNavigationMenu';
import { BottomNavigationMenu } from '../../components/bottomNavigationMenu';

export const Group = () => {

    const params = useParams()
    const [goalsList, setGoalsList] = useState([])
    const [activitiesList, setActivitiesList] = useState([])
    const [showList, setShowList] = useState(true)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 768);
    };

    const getGoals = () => {
        api
            .get(`/goals/?group=${params.id}`)
            .then(res => setGoalsList(res.data.results))
            .catch(err => console.log(err))
    }

    const getActivities = () => {
        api
            .get(`activities/?group=${params.id}`)
            .then(res => setActivitiesList(res.data.results))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    useEffect(() => {
        getGoals()
        getActivities()
    }, [])

    return (
        <>
            {isMobile ? (
                <BottomNavigationMenu/>
            ) : (
                <SideNavigationMenu/>
            )}
            <Container>
                <section>
                    <Button onClick={() => setShowList(true)} showList={showList}>Metas</Button>
                    <Button onClick={() => setShowList(false)} showList={!showList}>Atividades</Button>
                    <div></div>
                    <Link to="/groups">Voltar</Link>
                </section>
                <section>
                    {showList ? (goalsList.map(goal => (
                        // componente goal = tag ul
                        <ul>
                            <li>ID: {goal.id}</li>
                            <li>Nome: {goal.title}</li>
                        </ul>
                    ))) : (activitiesList.map(activity => (
                        // componente activity = tag ul
                        <ul>
                            <li>ID: {activity.id}</li>
                            <li>Nome: {activity.title}</li>
                        </ul>
                    )))}
                </section>
            </Container>
        </>
    )
}