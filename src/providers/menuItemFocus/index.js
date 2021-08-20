import { createContext, useState } from 'react';

export const MenuItemFocusContext = createContext();

export const MenuItemFocusProvider = ({children}) => {

    const [homeFocus, setHomeFocus] = useState(true);
    const [listFocus, setListFocus] = useState(false);
    const [groupFocus, setGroupFocus] = useState(false);
    const [signOutFocus, setSignOutFocus] = useState(false);
    
    return (
        <MenuItemFocusContext.Provider value={{homeFocus, listFocus, groupFocus, signOutFocus, 
            setHomeFocus, setListFocus, setGroupFocus, setSignOutFocus}}>
                {children}
        </MenuItemFocusContext.Provider>
    );
}