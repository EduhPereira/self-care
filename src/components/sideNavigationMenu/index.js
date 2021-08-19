import './style.css';

import { Background, Marker } from './styles';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItemFocusContext } from '../../providers/menuItemFocus';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import GroupIcon from '@material-ui/icons/Group';

export const SideNavigationMenu = () => {

    const {homeFocus, listFocus, groupFocus} = useContext(MenuItemFocusContext);

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