import { Container } from "./styles"
import { useHistory } from "react-router-dom"
import { useContext } from "react"
import { CurrentGroupContext } from "../../providers/currentGroup/currentGroup"

export const CardGroup = ({ group }) => {

    const { setCurrentGroup } = useContext(CurrentGroupContext)
    const history = useHistory()
    const handleClick = () => {
        history.push(`/groups/${group.id}`)
        setCurrentGroup(group)
    }

    return (
        <Container onClick={handleClick}>
            <h1>{group.name}</h1>
            <p>Descrição: {group.description}</p>
            <p>Categoria: {group.category}</p>
            <button className="button_group">Participar</button>
        </Container>
    )
}