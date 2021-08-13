import { createContext, useState, useContext } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const[id, setId] = useState(0)
    const[token, setToken] = useState('')

    return(
        <UserContext.Provider value={{id, setId, token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)