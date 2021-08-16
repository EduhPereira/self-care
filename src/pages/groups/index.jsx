import { Container, Button, ModalDiv, ContainerForm, ContainerButtons, ButtonUpdate, ButtonCancel, Form } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { CardGroup } from "../../components/cardGroup"
import { useUser } from "../../providers/UserProvider"
import * as yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export const Groups = () => {

    const [groups, setGroups] = useState([])
    const [filteredGroups, setFilteredGroups] = useState([])
    const [showList, setShowList] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const { id, token } = useUser()

    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório."),
        description: yup.string().required("Campo obrigatório."),
        category: yup.string().required("Escolha uma opção."),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        api.post("/groups/", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => console.log(res, "foi!")).catch(err => console.log(err))
    }

    const getGroups = () => {
        api
            .get("/groups/")
            .then(res => {
                setGroups(res.data.results)
                setFilteredGroups(res.data.results.filter(group => {
                    if (group.users_on_group.find(user => user.id === id)) {
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
            <ModalDiv showModal={showModal}>
                <ContainerForm>
                    <h2>Criar Grupo</h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name">Nome: <span>{errors.name?.message}</span></label>
                        <input type="text" {...register("name")} />

                        <label htmlFor="description">Categoria: <span>{errors.description?.message}</span></label>
                        <input type="text" {...register("description")} />

                        <label htmlFor="category">Categoria: <span>{errors.category?.message}</span></label>
                        <select name="category" {...register("category")}>
                            <option value="">--Escolha uma categoria--</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Música">Música</option>
                            <option value="Aventura">Aventura</option>
                            <option value="Estudos">Estudos</option>
                            <option value="Religão">Religão</option>
                            <option value="Esporte">Esporte</option>
                        </select>
                        <ContainerButtons>
                            <ButtonCancel type="button" onClick={() => setShowModal(false)}> Cancelar</ButtonCancel>
                            <ButtonUpdate type="submit" onClick={() => setShowModal(false)}>Criar</ButtonUpdate>
                        </ContainerButtons>
                    </Form>
                </ContainerForm>
            </ModalDiv>
            <section>
                <Button onClick={() => setShowList(true)} showList={showList}>Todos os grupos</Button>
                <Button onClick={() => setShowList(false)} showList={!showList}>Seus grupos</Button>
                <div>Ou</div>
                <span onClick={() => setShowModal(true)}>Criar seu grupo</span>
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