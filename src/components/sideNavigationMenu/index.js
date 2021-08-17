import './style.css';

import { Background, Marker } from './styles';
import { useState } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import GroupIcon from '@material-ui/icons/Group';

export const SideNavigationMenu = () => {

    const [homeFocus, setHomeFocus] = useState(true);
    const [listFocus, setListFocus] = useState(false);
    const [groupFocus, setGroupFocus] = useState(false);

    const handleHomeClick = () => {
        setHomeFocus(true);
        setListFocus(false);
        setGroupFocus(false);
    }

    const handleListClick = () => {
        setHomeFocus(false);
        setListFocus(true);
        setGroupFocus(false);
    }

    const handleGroupClick = () => {
        setHomeFocus(false);
        setListFocus(false);
        setGroupFocus(true);
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