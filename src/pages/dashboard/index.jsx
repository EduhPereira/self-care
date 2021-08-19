import './style.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

import { useState, useEffect } from 'react';
import { DesktopContainer, MobileContainer, Card, CardsContainer } from './styles';
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { CircularProgress } from "@material-ui/core";
import { SideNavigationMenu } from '../../components/sideNavigationMenu';
import { BottomNavigationMenu } from '../../components/bottomNavigationMenu';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper/core';
import { List } from '@material-ui/core';
import { User } from "../../components/user";

SwiperCore.use([Navigation]);

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
                <>
                    <BottomNavigationMenu style={{zIndex: 10}}/>
                    <MobileContainer>
                        <List className='listView'>
                            <h1>Hábitos</h1>                         
                            {loading ? (
                                <CircularProgress/>
                            ) : (
                                <Swiper navigation={true} className='mySwiper' spaceBetween={50} slidesPerView={1}>
                                    {habitsList.map((habit) => (
                                        <SwiperSlide>
                                            <Card>
                                                <p className='item-title'><strong>{habit.title}</strong></p>
                                                <p className='item-category'><strong>Categoria: </strong>{habit.category}</p>
                                            </Card>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>                            
                            )} 
                            <h1>Grupos</h1>
                            <Swiper navigation={true} className='mySwiper'>
                                {groups.map((group) => {
                                    if (!!group.users_on_group.find(user => user.id === Number(id))) {
                                        return (
                                            <SwiperSlide navigation={true} key={group.id}>
                                                <Card>
                                                    <p className='item-title'><strong>{group.name}</strong></p>
                                                    <p className='item-category'><strong>Categoria: </strong>{group.category}</p>
                                                </Card>
                                            </SwiperSlide>                                        
                                        );
                                    }
                                })}
                            </Swiper>
                        </List>
                    </MobileContainer>
                </>                
            ) : (
                <div style={{display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <User/>
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
                </div>
            )}
            
        </div>
    );
}