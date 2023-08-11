import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type AlertContextType = {
    alert: boolean;
    setAlert: Dispatch<SetStateAction<boolean>>;
};

const defaultState = {
    alert: false
} as AlertContextType

export const AlertContext = createContext<AlertContextType>(defaultState);

type AlertProviderProps = {
    children: ReactNode;
};

const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alert, setAlert] = useState(true);

    return <AlertContext.Provider value={{ alert, setAlert }}>{children}</AlertContext.Provider>;
};

export default AlertProvider;
