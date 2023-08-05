import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

type StatsProps = {};

// Generate Sales Data
function createData(time: string, amount?: number) {
    return { time, amount };
}

const data = [createData('00:00', 2000), createData('01:00', 5000)];

const Stats: React.FC<StatsProps> = ({}) => {
    const theme = useTheme();

    return (
        <>
            <Title>Today</Title>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey='sales'>
                        <Label
                            position='insideBottom'
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Sales ($)
                        </Label>
                    </XAxis>
                    <YAxis />
                    <Bar dataKey='amount' fill='green' />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};
export default Stats;
