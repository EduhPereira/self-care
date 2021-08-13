import { Container } from "./styles"
import { useHistory } from "react-router-dom"
import { api } from "../../services/api"
import { UseCurrentGroup } from "../../providers/currentGroup/currentGroup"
import { useUser } from "../../providers/UserProvider"


export const CardGroup = ({ group }) => {

    const { setCurrentGroup } = UseCurrentGroup()
    const history = useHistory()
    const { token } = useUser()

    const handleClickContainer = () => {
        history.push(`/groups/${group.id}`)
        setCurrentGroup(group)
    }

    const handleClickSubscribe = () => {
        api.post(`groups/${group.id}/subscribe/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => console.log(res)).catch(err => console.log(err))
    }

    return (
        <Container>
            <div onClick={handleClickContainer}>
                <h1>{group.name}</h1>
                <p>Descrição: {group.description}</p>
                <p>Categoria: {group.category}</p>
            </div>
            <button className="button_group" onClick={handleClickSubscribe}>Participar</button>
        </Container>
    )
}