import { CurrentGroupProvider } from "./currentGroup/currentGroup";

export const Providers = ({ children }) => {
    return (
        <CurrentGroupProvider>
            {children}
        </CurrentGroupProvider>
    )
}