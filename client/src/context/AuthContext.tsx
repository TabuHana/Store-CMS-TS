import { createContext, useState } from 'react';

type User = {
    email: string;
    password: string;
};

type Auth = {
    user: User;
    accessToken: string
}

type RegisterType = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export type AuthContextType = {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (user: User) => void;
    logout: () => void;
    register: (data: RegisterType) => void;
};

type AuthProviderType = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [user, setUser] = useState<User | null>(null);
    const [auth, setAuth] = useState<Auth | null>(null)

    const login = (user: User) => {
        console.log(user);
    };

    const logout = () => {
        setUser(null);
    };

    const register = (data: RegisterType) => {
        console.log(data);
    };

    return <AuthContext.Provider value={{ auth, setAuth, user, setUser, login, logout, register }}>{children}</AuthContext.Provider>;
};

// working in branch for server edits on token