import { createContext, useState } from 'react';

type Auth = {
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
