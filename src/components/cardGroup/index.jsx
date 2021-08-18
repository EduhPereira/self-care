import { Container } from "./styles"
import { useHistory } from "react-router-dom"
import { api } from "../../services/api"
import { UseCurrentGroup } from "../../providers/currentGroup/currentGroup"
import { useUser } from "../../providers/UserProvider"
import { toast } from "react-toastify"


export const CardGroup = ({ group, getGroups, getSubscriptions, registered }) => {

    const { setCurrentGroup } = UseCurrentGroup()
    const history = useHistory()
    const { token } = useUser()

    const handleClickContainer = () => {
        history.push(`/groups/${group.id}`)
        setCurrentGroup(group)
    }

    const handleClickSubscribe = () => {
        api.post(`/groups/${group.id}/subscribe/`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            getGroups()
            getSubscriptions()
            toast.success("Inscrição realizada com sucesso!")
        }).catch(err => toast.error("Erro ao se inscrever!"))
    }
    return (
        <Container>
            <div onClick={handleClickContainer}>
                <h1>{group.name}</h1>
                <p>Descrição: {group.description}</p>
                <p>Categoria: {group.category}</p>
            </div>
            {!registered && <button className="button_group" onClick={handleClickSubscribe}>Participar</button>}
        </Container>
    )
}