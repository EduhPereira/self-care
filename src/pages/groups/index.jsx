import React from 'react';
import { Container, Button, MobileButton, ModalDiv, ContainerButtons, Form } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { CardGroup } from "../../components/cardGroup";
import { useUser } from "../../providers/UserProvider";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SideNavigationMenu } from '../../components/sideNavigationMenu';
import { BottomNavigationMenu } from '../../components/bottomNavigationMenu';
import { NotFoundMsg } from "../../components/notFoundMsg";
import { useHistory } from 'react-router-dom';
import { UseCurrentGroup } from "../../providers/currentGroup/currentGroup";
import { ListItemText, Typography, Divider } from '@material-ui/core';

import GroupAddIcon from '@material-ui/icons/GroupAdd';

export const Groups = () => {

    const [groups, setGroups] = useState([]);
    const [registeredGroups, setRegisteredGroups] = useState([]);
    const [showList, setShowList] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { id, token } = useUser();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { setCurrentGroup } = UseCurrentGroup()

    const history = useHistory();

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
            console.log("grupo criado!", res);
            return res
        }).then(res => {
            api.post(`/groups/${res.data.id}/subscribe/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => {
                console.log('incrição', res);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));

        getGroups();
        getSubscriptions();
    }

    const getGroups = () => {
        api
            .get("/groups/")
            .then(res => {
                setGroups(res.data.results);
            })
            .catch(err => console.log(err));
    }

    const getSubscriptions = () => {
        api.get("/groups/subscriptions/", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            setRegisteredGroups(res.data);
        }
        ).catch(err => console.log(err));
    }

    const handleClickContainer = (group) => {
        history.push(`/groups/${group.id}`);
        setCurrentGroup(group);
    }

    const handleClickSubscribe = (group) => {
        api.post(`/groups/${group.id}/subscribe/`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            getGroups();
            getSubscriptions();
            console.log(res, 'teste')
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    useEffect(() => {
        getGroups();
        getSubscriptions();
    }, [])

    return (
        <>
            {isMobile ? (
                <>
                    <BottomNavigationMenu/>
                    <MobileButton onClick={() => setShowList(true)} showList={showList}>Todos os grupos</MobileButton>
                    <MobileButton onClick={() => setShowList(false)} showList={!showList}>Seus grupos</MobileButton>
                    <div style={{paddingBottom: 130}}>
                        {(showList ? (groups.map(group => (
                            !!!group.users_on_group.find(group => group.id === Number(id)) && 
                            <>
                                <div key={group.id} style={{padding: 10}}>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                            <Typography
                                                component="h3"
                                                variant="body3"
                                            >
                                                {group.name}
                                            </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                            >
                                                <strong>Categoria:</strong> {group.category}
                                            </Typography>                                          
                                            </React.Fragment>
                                        }/>
                                    <GroupAddIcon style={{position: 'relative', left: '80vw'}}
                                        onClick={() => handleClickSubscribe(group)}/>
                                </div>
                                <Divider/>
                            </>
                        ))) : (registeredGroups.length > 0 ? registeredGroups.map(group => (
                            <>
                                <div key={group.id} onClick={() => handleClickContainer(group)}
                                    style={{padding: 10}}>
                                    <ListItemText
                                            primary={
                                                <React.Fragment>
                                                <Typography
                                                    component="h3"
                                                    variant="body3"
                                                >
                                                    {group.name}
                                                </Typography>
                                                </React.Fragment>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    <strong>Categoria:</strong> {group.category}
                                                </Typography>                                          
                                                </React.Fragment>
                                            }/>
                                </div>
                                <Divider/>
                            </>
                        )) : (<NotFoundMsg>Você não possui Grupos</NotFoundMsg>))
                        )}
                    </div>
                </>
            ) : (
                <>
                    <SideNavigationMenu />
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
                                    <button className="update" type="submit" onClick={() => setShowModal(false)}>Criar</button>
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
                    </Container>
                </>
            )}
        </>
    )
}