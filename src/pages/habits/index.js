import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import {
  Container,
  MobileContainer,
  ContentCategory,
  Cards,
  Card,
  Icons,
  CreateHabit,
} from "./styles";
import { FaCheck, FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ModalHabits } from "../../components/modalHabits";
import { CircularProgress } from "@material-ui/core";
import { NotFoundMsg } from "../../components/notFoundMsg";

import { SideNavigationMenu } from "../../components/sideNavigationMenu";
import { BottomNavigationMenu } from "../../components/bottomNavigationMenu";
import { User } from "../../components/user";
import { useContext } from 'react';
import { MenuItemFocusContext } from '../../providers/menuItemFocus';
import { ListItemText } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Divider } from "@material-ui/core";

export const Habits = () => {
  const { id, token } = useUser();
  const [habitsList, setHabitsList] = useState([]);
  const [habitListFilter, sethabitListFilter] = useState([]);
  const [habitEdit, setHabitEdit] = useState([]);
  const [visible, setVisible] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState("Todas");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { setHomeFocus, setListFocus, setGroupFocus } = useContext(MenuItemFocusContext);

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
    setHabitsList(response.data);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    const ac = new AbortController();
    habits();
    return () => ac.abort();    
  }, []);

  useEffect(() => {
    setHomeFocus(false);
    setListFocus(true);
    setGroupFocus(false);
  }, []);

  const deleteHabit = async (id) => {
    const response = await api.delete(`/habits/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await habits();
    toast.warning("Hábito excluído");
  };

  const checkHabit = async (value, id) => {
    const response = await api.patch(
      `/habits/${id}/`,
      { how_much_achieved: value + 1, achieved: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.info("Hábito feito");
  };

  const openUpdateHabit = (habit) => {
    setTitleModal("Edite seu hábito:");
    setVisible(true);
    setHabitEdit(habit);
  };

  const openNewHabit = () => {
    setTitleModal("Crie seu hábito:");
    setVisible(true);
  };

  const selectCategory = (event) => {
    setControl(event.target.value);
    let filterList = habitsList.filter((el) => {
      if (el.category.includes(event.target.value)) {
        return el;
      }
    });

    sethabitListFilter(filterList);
  };

  return (
    <>
      {isMobile ? (
        <>
          <BottomNavigationMenu openHabit={openNewHabit} style={{zIndex: 999}}/>
            <MobileContainer>
              <ModalHabits
                habitsF={habits}
                setVisible={setVisible}
                visible={visible}
                habit={habitEdit}
                titleModal={titleModal}
              />
              <ContentCategory>
                <h3>Categorias</h3>

                <select onChange={selectCategory}>
                  <option selected value="Todas">
                    Todas
                  </option>
                  <option value="Saúde">Saúde</option>
                  <option value="Música">Música</option>
                  <option value="Aventura">Aventura</option>
                  <option value="Estudos">Estudos</option>
                  <option value="Religão">Religão</option>
                  <option value="Esporte">Esporte</option>
                </select>
              </ContentCategory>

              {loading ? (
                <CircularProgress />
              ) : (
                <div style={{zIndex: 1}}>
                  {control === "Todas" ? (
                    <>
                      {habitsList.length === 0 ? (
                        <NotFoundMsg>Você não criou nenhum hábito</NotFoundMsg>
                      ) : (
                        <div style={{width: '100%'}}>
                          {habitsList.map((el) => (
                              <div key={el.id} style={{position: 'relative', left: '-12vw'}}>
                                <ListItemText
                                  primary={
                                    <React.Fragment>
                                    <Typography
                                        variant="h6"
                                    >
                                        {el.title}
                                    </Typography>
                                    </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                  <Typography
                                      component="span"
                                      variant="body2"
                                  >
                                      <p><strong>Categoria:</strong> {el.category}</p>
                                      <p><strong>Dificuldade:</strong> {el.difficulty}</p>
                                      <p><strong>Dias conquistados: </strong> {el.how_much_achieved}</p>
                                      <p><strong>Frequencia: </strong> {el.frequency}</p>
                                  </Typography>                                          
                                  </React.Fragment>
                              }/>
                                <Icons style={{position: 'relative', left: '40vw', paddingBottom: 10}}>
                                  <div onClick={() => deleteHabit(el.id)}>
                                    <DeleteForeverIcon style={{color: '#d81c48'}}/>
                                  </div>
                                  <div onClick={() => openUpdateHabit(el)}>
                                    <EditIcon style={{color: '#f7a902'}}/>
                                  </div>
                                  <div
                                    onClick={() =>
                                      checkHabit(el.how_much_achieved, el.id)
                                    }
                                  >
                                    <DoneAllIcon style={{color: '#285bd3'}}/>
                                  </div>
                                </Icons>
                                <Divider/>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {habitListFilter.length === 0 ? (
                        <NotFoundMsg>Sem hábitos nesta categoria</NotFoundMsg>
                      ) : (
                        <>
                          {habitListFilter.map((el) => (
                            <div key={el.id} style={{position: 'relative', left: '-12vw'}}>
                            <ListItemText
                              primary={
                                <React.Fragment>
                                <Typography
                                    variant="h6"
                                >
                                    {el.title}
                                </Typography>
                                </React.Fragment>
                            }
                            secondary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body2"
                              >
                                  <p><strong>Categoria:</strong> {el.category}</p>
                                  <p><strong>Dificuldade:</strong> {el.difficulty}</p>
                                  <p><strong>Dias conquistados: </strong> {el.how_much_achieved}</p>
                                  <p><strong>Frequencia: </strong> {el.frequency}</p>
                              </Typography>                                          
                              </React.Fragment>
                          }/>
                            <Icons style={{position: 'relative', left: '40vw', paddingBottom: 10}}>
                              <div onClick={() => deleteHabit(el.id)}>
                                <DeleteForeverIcon style={{color: '#d81c48'}}/>
                              </div>
                              <div onClick={() => openUpdateHabit(el)}>
                                <EditIcon style={{color: '#f7a902'}}/>
                              </div>
                              <div
                                onClick={() =>
                                  checkHabit(el.how_much_achieved, el.id)
                                }
                              >
                                <DoneAllIcon style={{color: '#285bd3'}}/>
                              </div>
                            </Icons>
                            <Divider/>
                          </div>
                        )
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </MobileContainer>
        </>
      ) : (
        <>
          <SideNavigationMenu />
          <Container>
            <User />

            <ModalHabits
              habitsF={habits}
              setVisible={setVisible}
              visible={visible}
              habit={habitEdit}
              titleModal={titleModal}
              style={{zIndex: 999}}
            />
            <ContentCategory>
              <h3>Categorias</h3>

              <select onChange={selectCategory}>
                <option selected value="Todas">
                  Todas
                </option>
                <option value="Saúde">Saúde</option>
                <option value="Música">Música</option>
                <option value="Aventura">Aventura</option>
                <option value="Estudos">Estudos</option>
                <option value="Religão">Religão</option>
                <option value="Esporte">Esporte</option>
              </select>
            </ContentCategory>

            <CreateHabit>
              <button onClick={openNewHabit}>Crie seu hábito:</button>
            </CreateHabit>

            {loading ? (
              <CircularProgress />
            ) : (
              <Cards>
                {control === "Todas" ? (
                  <>
                    {habitsList.length === 0 ? (
                      <NotFoundMsg>Você não criou nenhum hábito</NotFoundMsg>
                    ) : (
                      <>
                        {habitsList.map((el) => {
                          return (
                            <Card key={el.id}>
                              <div className="Title">
                                <p className="Habit">Hábito: </p>
                                <p>{el.title}</p>
                              </div>
                              <p className="Difficulty">
                                <span>Dificuldade:</span> {el.difficulty}
                              </p>
                              <p className="Category">
                                <span>Categoria:</span> {el.category}
                              </p>
                              <p className="Achievements">
                                <span>Dias conquistados: </span>
                                {el.how_much_achieved}
                              </p>

                              <p className="Frequency">
                                <span>Frequencia: </span>
                                {el.frequency}
                              </p>
                              <Icons>
                                <div onClick={() => deleteHabit(el.id)}>
                                  <RiDeleteBin2Line className="Delete" />
                                  <span>Excluir</span>
                                </div>
                                <div onClick={() => openUpdateHabit(el)}>
                                  <FaEdit className="Edit" />
                                  <span>Editar</span>
                                </div>
                                <div
                                  onClick={() =>
                                    checkHabit(el.how_much_achieved, el.id)
                                  }
                                >
                                  <FaCheck className="Check" />
                                  <span>Concluir</span>
                                </div>
                              </Icons>
                            </Card>
                          );
                        })}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {habitListFilter.length === 0 ? (
                      <NotFoundMsg>Sem hábitos nesta categoria</NotFoundMsg>
                    ) : (
                      <>
                        {habitListFilter.map((el) => {
                          return (
                            <Card key={el.id}>
                              <div className="Title">
                                <p className="Habit">Hábito: </p>
                                <p>{el.title}</p>
                              </div>
                              <p className="Difficulty">
                                <span>Dificuldade:</span> {el.difficulty}
                              </p>
                              <p className="Category">
                                <span>Categoria:</span> {el.category}
                              </p>
                              <p className="Achievements">
                                <span>Dias conquistados: </span>
                                {el.how_much_achieved}
                              </p>

                              <p className="Frequency">
                                <span>Frequencia: </span>
                                {el.frequency}
                              </p>

                              <Icons>
                                <div onClick={() => deleteHabit(el.id)}>
                                  <RiDeleteBin2Line className="Delete" />
                                  <span>Excluir</span>
                                </div>
                                <div onClick={() => openUpdateHabit(el)}>
                                  <FaEdit className="Edit" />
                                  <span>Editar</span>
                                </div>
                                <div
                                  onClick={() =>
                                    checkHabit(el.how_much_achieved, el.id)
                                  }
                                >
                                  <FaCheck className="Check" />
                                  <span>Concluir</span>
                                </div>
                              </Icons>
                            </Card>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </Cards>
            )}
          </Container>
        </>
      )}
    </>
  );
};
