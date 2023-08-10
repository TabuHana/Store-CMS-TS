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

export interface UserContextInterface {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
}

const defaultState = {
    user: {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    // State
    const [user, setUser] = useState<User>();

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
