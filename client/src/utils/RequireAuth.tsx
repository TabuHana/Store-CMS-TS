import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: any) => {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to='/auth/login' />;
    }

    return children;
};
export default RequireAuth;
