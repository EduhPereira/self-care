import { createContext, useState } from 'react';

export const MenuItemFocusContext = createContext();

export const MenuItemFocusProvider = ({children}) => {

    const [loading, setLoading] = useState(true);

    const itemFocused = localStorage.getItem('focus');

    const [homeFocus, setHomeFocus] = useState(true);
    const [listFocus, setListFocus] = useState(false);
    const [groupFocus, setGroupFocus] = useState(false);
    const [chatFocus, setChatFocus] = useState(false);

    if (loading) {
        if(itemFocused == 'home') {
            setHomeFocus(true);
            setListFocus(false);
            setGroupFocus(false);
            setChatFocus(false);
        }
    
        if(itemFocused == 'list') {
            setHomeFocus(false);
            setListFocus(true);
            setGroupFocus(false);
            setChatFocus(false);
        }
    
        if(itemFocused == 'group') {
            setHomeFocus(false);
            setListFocus(false);
            setGroupFocus(true);
            setChatFocus(false);
        }
    
        if(itemFocused == 'chat') {
            setHomeFocus(false);
            setListFocus(false);
            setGroupFocus(false);
            setChatFocus(true);
        }
        setLoading(false);
    }
    

    return (
        <MenuItemFocusContext.Provider value={{homeFocus, listFocus, groupFocus, chatFocus, 
            setHomeFocus, setListFocus, setGroupFocus, setChatFocus}}>
                {children}
        </MenuItemFocusContext.Provider>
    );
}