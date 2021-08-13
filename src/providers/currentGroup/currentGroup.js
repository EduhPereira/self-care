import { createContext, useState } from "react";

export const CurrentGroupContext = createContext([])

export const CurrentGroupProvider = ({ children }) => {
    const [currentGroup, setCurrentGroup] = useState({})

    return (
        <CurrentGroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
            {children}
        </CurrentGroupContext.Provider>
    )
}