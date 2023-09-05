import { createContext, useState } from 'react';

type User = {
    user_id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

type LoginType = {
    email: string;
    password: string;
};

type RegisterType = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

type Auth = {
    user: User;
    accessToken: string;
};

export type AuthContextType = {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
    login: (user: LoginType) => void;
    logout: () => void;
    register: (data: RegisterType) => void;
};

type AuthProviderType = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [auth, setAuth] = useState<Auth | null>(null);

    const login = (user: LoginType) => {
        console.log(user);
    };

    const logout = () => {
        console.log('logged out');
    };

    const register = (data: RegisterType) => {
        console.log(data);
    };

    return <AuthContext.Provider value={{ auth, setAuth, login, logout, register }}>{children}</AuthContext.Provider>;
};