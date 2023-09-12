import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../utils/fetchers';

const Dashboard = () => {
    const query = useQuery({ queryKey: ['user'], queryFn: getUser });

    console.log(query.data);

    return <div>dashboard</div>;
};
export default Dashboard;
