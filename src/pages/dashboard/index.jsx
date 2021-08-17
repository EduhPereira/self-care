import './style.css';

import { useState, useEffect } from 'react';
import { DesktopContainer, Card, CardsContainer } from './styles';
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { CircularProgress } from "@material-ui/core";
import { SideNavigationMenu } from '../../components/sideNavigationMenu';
import { BottomNavigationMenu } from '../../components/bottomNavigationMenu';

export const Dashboard = () => {

    const { id, token } = useUser();
    const [habitsList, setHabitsList] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 768);
    };

    const habits = async () => {
        const response = await api.get("/habits/personal/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        setHabitsList(response.data)
    };

    const getGroups = () => {
        api
            .get("/groups/")
            .then(res => {
                setGroups(res.data.results)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    useEffect(() => {
        habits()
    }, []);

    useEffect(() => {
        getGroups()
    }, []);

    return (
        <div>
            {isMobile ? (
                <BottomNavigationMenu/>
            ) : (
                <>
                    <SideNavigationMenu/>
                    <DesktopContainer>
                        <h1>Hábitos</h1>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <CardsContainer>
                                {habitsList.map((habit) => (
                                    <Card>
                                        <p className='item-title'><strong>{habit.title}</strong></p>
                                        <p className='item-difficulty'><strong>Dificuldade: </strong>{habit.difficulty}</p>
                                        <p className='item-category'><strong>Categoria: </strong>{habit.category}</p>
                                    </Card>
                                ))}
                            </CardsContainer>
                        )}
                        <h1>Grupos</h1>
                        <CardsContainer>
                            {groups.map((group) => {
                                if (!!group.users_on_group.find(user => user.id === Number(id))) {
                                    return (
                                        <Card key={group.id}>
                                            <p className='item-title'><strong>{group.name}</strong></p>
                                            <p className='item-description'><strong>Descrição: </strong>{group.description}</p>
                                            <p className='item-category'><strong>Categoria: </strong>{group.category}</p>
                                        </Card>
                                    );
                                }
                            })}
                        </CardsContainer>
                    </DesktopContainer>
                </>
            )}
            
        </div>
    );
}