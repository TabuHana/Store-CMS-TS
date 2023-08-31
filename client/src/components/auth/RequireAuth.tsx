import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ children }: any) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to='/auth/login' />;
    }

    return children;
};
export default RequireAuth;
