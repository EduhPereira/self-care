import { Container, UserContent, BoxUser } from "./styles";
import{ BiUserCircle } from 'react-icons/bi';
import imgLogo from '../../assets/self-care.png';
import { AiOutlineSetting, AiOutlinePoweroff }  from 'react-icons/ai';
import { useState } from "react";
import { UserModal } from "../userModal";
import { api } from "../../services/api";
import { useEffect } from "react";
import { useUser } from "../../providers/UserProvider";
import { useHistory } from 'react-router-dom';

export const User = ({habits}) => {
    const [name, setName] = useState('');
    const { token, id } = useUser();
    const [user, setUser] = useState(false);
    const [visible, setVisible] = useState(false);

    const history = useHistory();

    const openBox = () => {
        setUser(true);
    }

    const closeBox = () => {
        setUser(false);
    }

    const openUserModal = () => {
        setVisible(true);
        setUser(false);
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        history.push('/login');
    }

    useEffect(()=>{
        userName();
      }, [])
    
      const userName = async () => {
        const response = await api.get(`/users/${id}/`);
        const {data} = await response;
        setName(data.username);
      }
    

    return(
        <Container>
            <UserModal userName={userName} visible={visible} setVisible={setVisible}/>
            <img src={imgLogo}/>

            {user ?
                <UserContent onClick={closeBox}>
                <p>{name}</p>
                <BiUserCircle/>
                </UserContent>
                :
                <UserContent onClick={openBox}>
                <p>{name}</p>
                <BiUserCircle/>
                </UserContent>
            }
            

            <BoxUser user={user}>
                <div onClick={openUserModal}>
                    <AiOutlineSetting className="Settings"/>
                    <span>Configurar</span>
                </div>

                <div>
                    <AiOutlinePoweroff className="PowerOf"/>
                    <span onClick={handleSignOut}>Sair</span>
                </div>

            </BoxUser>
        </Container>
    )
}