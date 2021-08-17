import './style.css';

import { Background, Marker } from './styles';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItemFocusContext } from '../../providers/menuItemFocus';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import GroupIcon from '@material-ui/icons/Group';

export const SideNavigationMenu = () => {

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

    return (
        <Background>
            <Marker 
                className={`menuItem ${homeFocus ? 'focusedMenuItem' : 'hiddenMenuItem'}`}
                onClick={handleHomeClick}>
                <HomeIcon className={homeFocus ? 'whiteMarker' : 'grayMarker'} style={{fontSize: 50}}/>
            </Marker>
            <Marker 
                className={`menuItem ${listFocus ? 'focusedMenuItem' : 'hiddenMenuItem'}`}
                onClick={handleListClick}>
                <ListIcon className={listFocus ? 'whiteMarker' : 'grayMarker'} style={{fontSize: 50}}/>
            </Marker>
            <Marker 
                className={`menuItem ${groupFocus ? 'focusedMenuItem' : 'hiddenMenuItem'}`}
                onClick={handleGroupClick}>
                <GroupIcon className={groupFocus ? 'whiteMarker' : 'grayMarker'} style={{fontSize: 50}}/>
            </Marker>
        </Background>
    );
}