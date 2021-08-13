import { UserProvider } from "./UserProvider"
import { ModalProvider } from './ModalProvider'
import { CurrentGroupProvider } from "./currentGroup/currentGroup";

export const Providers = ({ children }) => {
    return (
        <UserProvider>
            <ModalProvider>
                <CurrentGroupProvider>
                    {children}
                </CurrentGroupProvider>
            </ModalProvider>
        </UserProvider>
    )
}