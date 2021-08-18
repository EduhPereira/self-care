import { Container, Button, ModalDiv, ContainerButtons, Form } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { CardGroup } from "../../components/cardGroup"
import { useUser } from "../../providers/UserProvider"
import * as yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SideNavigationMenu } from '../../components/sideNavigationMenu';
import { BottomNavigationMenu } from '../../components/bottomNavigationMenu';
import { NotFoundMsg } from "../../components/notFoundMsg"

export const Groups = () => {

    const [groups, setGroups] = useState([])
    const [registeredGroups, setRegisteredGroups] = useState([])
    const [showList, setShowList] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const { id, token } = useUser()
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [page, setPage] = useState(1)

    const verifyNextPage = (nextPage) => {
        if (!!nextPage) {
            setPage(page + 1)
        }
    }

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 768);
    };

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
        }).then(res => {
            console.log("grupo criado!", res)
            return res
        }).then(res => {
            api.post(`/groups/${res.data.id}/subscribe/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => {
                console.log('incrição', res)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))

        getGroups()
        getSubscriptions()
        setShowModal(false)
    }

    const getGroups = () => {
        api
            .get(`/groups/?page=${page}`)
            .then(res => {
                setGroups([...groups, ...res.data.results])
                verifyNextPage(res.data.next)
            })
            .catch(err => console.log(err))
    }

    const getSubscriptions = () => {
        api.get("/groups/subscriptions/", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            setRegisteredGroups(res.data)
        }
        ).catch(err => console.log(err))
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    useEffect(() => {
        getGroups()
        getSubscriptions()
    }, [])

    useEffect(() => {
        getGroups()
    }, [page])

    console.log(page)

    return (
        <>
            {isMobile ? (
                <BottomNavigationMenu />
            ) : (
                <SideNavigationMenu />
            )}
            <Container>
                <ModalDiv showModal={showModal}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Criar Grupo</h2>
                        <label htmlFor="name">Nome: <span>{errors.name?.message}</span></label>
                        <input type="text" {...register("name")} />

                        <label htmlFor="description">Descrição: <span>{errors.description?.message}</span></label>
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
                            <button type="button" onClick={() => setShowModal(false)}> Cancelar</button>
                            <button className="update" type="submit">Criar</button>
                        </ContainerButtons>
                    </Form>
                </ModalDiv>
                <section>
                    <Button onClick={() => setShowList(true)} showList={showList}>Todos os grupos</Button>
                    <Button onClick={() => setShowList(false)} showList={!showList}>Seus grupos</Button>
                    <div>Ou</div>
                    <span onClick={() => setShowModal(true)}>Criar seu grupo</span>
                </section>
                <section>
                    {(showList ? (groups.map(item => (
                        !!!item.users_on_group.find(user => user.id === Number(id)) && < CardGroup
                            key={item.id}
                            group={item}
                            getGroups={getGroups}
                            getSubscriptions={getSubscriptions}
                        />
                    ))) : (registeredGroups.length > 0 ? registeredGroups.map(item => (
                        <CardGroup key={item.id} group={item} registered />
                    )) : (<NotFoundMsg>Você não possui Grupos</NotFoundMsg>))
                    )}
                </section>
                <div className="box" />
            </Container>
        </>
    )
}