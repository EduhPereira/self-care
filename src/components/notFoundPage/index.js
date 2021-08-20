import img404 from '../../assets/404.gif'
import { Container } from './styles'
export const NotFoundPage = () => {
    return(
        <Container>
            <img src={img404}/>
        </Container>
    )
}