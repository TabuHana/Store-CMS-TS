import useAuthContext from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import Spinner from '../Spinner/Spinner';

const PersistedLogin = ({ children }: any) => {
    const { auth } = useAuthContext();
    const refresh = useRefreshToken();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                console.log('trying refresh')
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return <>{isLoading ? <Spinner /> : children}</>;
};
export default PersistedLogin;
