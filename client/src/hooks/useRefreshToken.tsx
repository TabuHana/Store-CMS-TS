import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/user/refresh', {
            withCredentials: true,
        });

        setAuth(response.data);

        return response.data.newAccessToken;
    };

    return refresh;
};
export default useRefreshToken;

// working in separate branch
