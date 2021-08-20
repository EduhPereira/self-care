import './style.css';

import { Background, IconButton, FloatingIconButton, Marker } from './styles';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItemFocusContext } from '../../providers/menuItemFocus';
import { useUser } from "../../providers/UserProvider";

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const BottomNavigationMenu = ({openHabit}) => {

    const {homeFocus, listFocus, groupFocus, signOutFocus} = useContext(MenuItemFocusContext);
    const { setIsLoggedIn } = useUser();

    const history = useHistory();

    const handleHomeClick = () => {
        history.push('/dashboard');
    }

    const handleListClick = () => {
        history.push('/habits');
    }

    const handleGroupClick = () => {
        history.push('/groups');
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
    }

    const addHabit = () => {
        openHabit();
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
            {listFocus ? (
                <FloatingIconButton>
                    <AddIcon onClick={addHabit} style={{color: 'white', fontSize: 40}}/>
                </FloatingIconButton>
            ) : (
                <div></div>
            )}            
            <IconButton onClick={handleGroupClick}>
                <Marker className={groupFocus ? 'active' : 'hidden'}/>
                <GroupIcon className={groupFocus ? 'focused' : 'default'} style={{fontSize: 30}}/>
            </IconButton>
            <IconButton onClick={handleSignOut}>
                <Marker className={signOutFocus ? 'active' : 'hidden'}/>
                <ExitToAppIcon className={signOutFocus ? 'focused' : 'default'} style={{fontSize: 30}}/>
            </IconButton>
        </Background>
    );
}