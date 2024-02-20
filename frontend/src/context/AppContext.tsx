import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api/apiClient";

type AppContextProps = {
    isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isError } = useQuery("validateToken", apiClient.authToken, {
        retry: false,
    });
    return (
        <AppContext.Provider value={{ isLoggedIn: !isError }}>
            {children}
        </AppContext.Provider>
    );
};

//method to access context
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextProps;
};
