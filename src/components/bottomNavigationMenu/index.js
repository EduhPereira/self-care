import './style.css';

import { Background, IconButton, FloatingIconButton, Marker } from './styles';
import { useState } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';

export const BottomNavigationMenu = () => {

    const [homeFocus, setHomeFocus] = useState(true);
    const [listFocus, setListFocus] = useState(false);
    const [groupFocus, setGroupFocus] = useState(false);
    const [chatFocus, setChatFocus] = useState(false);

    const handleHomeClick = () => {
        setHomeFocus(true);
        setListFocus(false);
        setGroupFocus(false);
        setChatFocus(false);
    }

    const handleListClick = () => {
        setHomeFocus(false);
        setListFocus(true);
        setGroupFocus(false);
        setChatFocus(false);
    }

    const handleGroupClick = () => {
        setHomeFocus(false);
        setListFocus(false);
        setGroupFocus(true);
        setChatFocus(false);
    }

    const handleChatClick = () => {
        setHomeFocus(false);
        setListFocus(false);
        setGroupFocus(false);
        setChatFocus(true);
    }

    return (
        <Background>
            <IconButton onClick={handleHomeClick}>
                <Marker className={homeFocus ? 'active' : 'hidden'}/>
                <HomeIcon className={homeFocus ? 'focused' : 'default'} style={{fontSize: 30}}/>
            </IconButton>
            <IconButton onClick={handleListClick}>
                <Marker className={listFocus ? 'active' : 'hidden'}/>
                <ListIcon className={listFocus ? 'focused' : 'default'} style={{fontSize: 30}}/>
            </IconButton>
            <FloatingIconButton>
                <AddIcon style={{color: 'white', fontSize: 40}}/>
            </FloatingIconButton>
            <IconButton onClick={handleGroupClick}>
                <Marker className={groupFocus ? 'active' : 'hidden'}/>
                <GroupIcon className={groupFocus ? 'focused' : 'default'} style={{fontSize: 30}}/>
            </IconButton>
            <IconButton onClick={handleChatClick}>
                <Marker className={chatFocus ? 'active' : 'hidden'}/>
                <ChatIcon className={chatFocus ? 'focused' : 'default'} style={{fontSize: 30}}/>
            </IconButton>
        </Background>
    );
}