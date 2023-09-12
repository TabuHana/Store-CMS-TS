import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Dashboard = () => {
    const axiosPrivate = useAxiosPrivate()
    const { data } = useQuery({ queryKey: ['user'], queryFn: async () => {
        const user = await axiosPrivate.get('/api/user/me')

        return user.data
    } });

    console.log(data);

    return <div>dashboard</div>;
};
export default Dashboard;
