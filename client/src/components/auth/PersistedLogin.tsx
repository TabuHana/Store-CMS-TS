import useAuthContext from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';

const PersistedLogin = ({ children }: any) => {
    const { auth } = useAuthContext();
    const refresh = useRefreshToken();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return <>{isLoading ? <p>Loading...</p> : children}</>;
};
export default PersistedLogin;
