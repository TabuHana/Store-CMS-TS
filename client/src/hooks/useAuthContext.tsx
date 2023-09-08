import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const useAuthContext = () => {
    const useAuth = useContext(AuthContext)
    
    if(!useAuth) {
        throw new Error('useAuthContext must be used within a AuthContextProvider')
    }
    return useAuth
}

export default useAuthContext