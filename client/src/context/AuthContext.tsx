import { createContext, useState } from 'react';

type User = {
    email: string;
    password: string;
};

type RegisterType = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export type AuthContextType = {
    user: any;
    setUser: any;
    login: (user: User) => void;
    logout: () => void;
    register: (data: RegisterType) => void
};

type AuthProviderType = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User) => {
        console.log(user)
    };

    const logout = () => {
        setUser(null);
    };

    const register = (data: RegisterType) => {
        console.log(data)
    }

    return <AuthContext.Provider value={{ user, setUser, login, logout, register }}>{children}</AuthContext.Provider>;
};
