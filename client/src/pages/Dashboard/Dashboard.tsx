import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard = () => {
    const axiosPrivate = useAxiosPrivate();
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = await axiosPrivate.get('/api/user/me');

            return user.data;
        },
    });

    console.log(data);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -180,
                            endAngle: 180,
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={500}
                    height={300}
                />
            </div>
            Order View Coming Soon!
        </div>
    );
};
export default Dashboard;
