import  foundImg from "../../assets/not-found.png";

import { Container } from './styles'
export const NotFoundMsg = ({children}) => {
    return(
        <Container>
            <img src={foundImg} />
            <p>{children}</p>
        </Container>
    )
}