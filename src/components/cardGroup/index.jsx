import { Container } from "./styles"

export const CardGroup = ({ group }) => {

    return (
        <Container>
            <h1>{group.name}</h1>
            <p>Descrição: {group.description}</p>
            <p>Categoria: {group.category}</p>
            <button className="button_group">Participar</button>
        </Container>
    )
}