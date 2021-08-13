import { Container, Button } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { CardGroup } from "../../components/cardGroup"
import { useUser } from "../../providers/UserProvider"

export const Groups = () => {

    const [groups, setGroups] = useState([])
    const [filteredGroups, setFilteredGroups] = useState([])
    const [showList, setShowList] = useState(true)
    const { Id } = useUser()

    const getGroups = () => {
        api
            .get("/groups/")
            .then(res => {
                setGroups(res.data.results)
                setFilteredGroups(res.data.results.filter(group => {
                    if (group.users_on_group.find(user => user.id === userId)) {
                        return true
                    }
                }))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getGroups()
    }, [])

    return (
        <Container>
            <section>
                <Button onClick={() => setShowList(true)} showList={showList}>Todos os grupos</Button>
                <Button onClick={() => setShowList(false)} showList={!showList}>Seus grupos</Button>
                <div>Ou</div>
                <span>Criar seu grupo</span>
            </section>
            <section>
                {(showList ? (groups.map(item => (
                    <CardGroup key={item.id} group={item} />
                ))) : (filteredGroups.length > 0 ? filteredGroups.map(item => (
                    <CardGroup key={item.id} group={item} />
                )) : (<h1>Você não possui grupos</h1>))
                )}
            </section>
        </Container>
    )
}