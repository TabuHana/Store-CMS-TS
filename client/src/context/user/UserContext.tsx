// React
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export type User = {
    user_id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserContextType = {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
};

type UserProviderProps = {
    children: ReactNode;
};

const defaultState = {
    user: {},
} as UserContextType;

export const UserContext = createContext(defaultState);

const UserProvider = ({ children }: UserProviderProps) => {
    // State
    const [user, setUser] = useState<User>();

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
