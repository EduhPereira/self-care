import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api"
import { Button, Container } from "../groups/styles";

export const Group = () => {

    const params = useParams()
    const [goalsList, setGoalsList] = useState([])
    const [activitiesList, setActivitiesList] = useState([])
    const [showList, setShowList] = useState(true)

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
        getGoals()
        getActivities()
    }, [])

    return (
        <Container>
            <section>
                <Button onClick={() => setShowList(true)} showList={showList}>Metas</Button>
                <Button onClick={() => setShowList(false)} showList={!showList}>Atividades</Button>
                <div></div>
                <Link to="/groups">Voltar</Link>
            </section>
            <section>
                {showList ? (goalsList.map(goal => (
                    <ul>
                        <li>ID: {goal.id}</li>
                        <li>Nome: {goal.title}</li>
                    </ul>
                ))) : (activitiesList.map(activity => (
                    <ul>
                        <li>ID: {activity.id}</li>
                        <li>Nome: {activity.title}</li>
                    </ul>
                )))}
            </section>
        </Container>
    )
}