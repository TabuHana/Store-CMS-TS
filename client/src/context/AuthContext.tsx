import { createContext, useState } from 'react';

type User = {
    user_id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

type Auth = {
    user: User;
    accessToken: string;
};

type AuthContextType = {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
};

type AuthProviderType = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [auth, setAuth] = useState<Auth | null>(null);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
