import axios from '../api/axios';
import useAuthContext from './useAuthContext';

const useRefreshToken = () => {
    const { setAuth } = useAuthContext();

    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh', {
            withCredentials: true,
        });

        setAuth(response.data);

        return response.data.newAccessToken;
    };

    return refresh;
};
export default useRefreshToken;
