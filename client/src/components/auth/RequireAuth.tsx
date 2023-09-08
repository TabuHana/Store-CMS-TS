import { Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const RequireAuth = ({ children }: any) => {
    const { auth } = useAuthContext();

    if (!auth?.accessToken) {
        return <Navigate to='/auth/login' />;
    }

    return children;
};
export default RequireAuth;
