import { getUser } from '../utils/fetcher';
import { useQuery } from '@tanstack/react-query';

type User = {
    user_id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

const Display = () => {
    const { data, error } = useQuery<User | null>(['user'], getUser);

    console.log('data', data);
    console.log('error', error);

    if (data) {
        return (
            <div>
                <div>Username: {data.name}</div>
                <div>email: {data.email}</div>
            </div>
        );
    }

    return <div>Login failed</div>;
};
export default Display;
