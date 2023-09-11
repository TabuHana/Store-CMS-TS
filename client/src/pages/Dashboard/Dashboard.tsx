import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../utils/fetcher';

const Dashboard = () => {
    // const queryClient = useQueryClient()

    const query = useQuery({ queryKey: ['user'], queryFn: getUser });

    console.log(query.data);

    return <div>dashboard</div>;
};
export default Dashboard;
