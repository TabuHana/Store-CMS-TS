import { createContext, useContext, useState } from 'react';

type User = {
    email: string;
    name: string;
};

export type AuthContextType = {
    user: any;
    setUser: any;
    login: (user: User) => void;
    logout: () => void;
};

type AuthProviderType = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
