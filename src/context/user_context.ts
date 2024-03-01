import { createContext, useContext } from "react";

export const UserContext = createContext<any>(null)

export const useAuth = () => {
    return useContext(UserContext)
}

