import { UserProvider } from "./UserProvider"
import { ModalProvider } from './ModalProvider'

export const Providers = ({children}) => {
    return(
        <UserProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </UserProvider>
    )
}