import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

const AlertContext = createContext({children})

export const AlertProvider = ({children}) => {
    const initialState = null;

    const [alert, setAlert] = useState()
}