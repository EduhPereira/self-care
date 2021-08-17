import { UserProvider } from "./UserProvider";
import { ModalProvider } from './ModalProvider';
import { CurrentGroupProvider } from "./currentGroup/currentGroup";
import { MenuItemFocusProvider } from './menuItemFocus';

export const Providers = ({ children }) => {
    return (
        <MenuItemFocusProvider>
            <UserProvider>
                <ModalProvider>
                    <CurrentGroupProvider>
                        {children}
                    </CurrentGroupProvider>
                </ModalProvider>
            </UserProvider>
        </MenuItemFocusProvider>
    );
}