import { Container } from "./styles"
import { useHistory } from "react-router-dom"
import { api } from "../../services/api"
import { UseCurrentGroup } from "../../providers/currentGroup/currentGroup"


export const CardGroup = ({ group }) => {

    const { setCurrentGroup } = UseCurrentGroup()
    const history = useHistory()
    //subtituir por ´useState(JSON.parse(localStorage.getItem("@KenzieHub:token")))´
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI5MzAwMTA0LCJqdGkiOiI5YWY1OGJkZmEyMzQ0MGM3YTg3OWU2YzU2ODI5ZTZiZSIsInVzZXJfaWQiOjE2MzZ9.nDC4jmtydOoyTQ-wbCSYNPH9Hdft9d0fDiKBz022nWE"

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