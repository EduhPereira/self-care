import './style.css';

import { Background, IconButton, FloatingIconButton, Marker } from './styles';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItemFocusContext } from '../../providers/menuItemFocus';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';

export const BottomNavigationMenu = () => {

    const {homeFocus, listFocus, groupFocus, chatFocus, 
        setHomeFocus, setListFocus, setGroupFocus, setChatFocus} = useContext(MenuItemFocusContext);

    const history = useHistory();

    const handleHomeClick = () => {
        setHomeFocus(true);
        setListFocus(false);
        setGroupFocus(false);
        setChatFocus(false);
        localStorage.setItem('focus', 'home');
        history.push('/dashboard');
    }

    const handleListClick = () => {
        setHomeFocus(false);
        setListFocus(true);
        setGroupFocus(false);
        setChatFocus(false);
        localStorage.setItem('focus', 'list');
        history.push('/habits');
    }

    const handleGroupClick = () => {
        setHomeFocus(false);
        setListFocus(false);
        setGroupFocus(true);
        setChatFocus(false);
        localStorage.setItem('focus', 'group');
        history.push('/groups');
    }

    const handleChatClick = () => {
        setHomeFocus(false);
        setListFocus(false);
        setGroupFocus(false);
        setChatFocus(true);
        localStorage.setItem('focus', 'chat');
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