import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Link as RouterLink } from 'react-router-dom';

const Deposits = () => {
    return (
        <>
            <Title>Total Revenue</Title>
            <Typography component='p' variant='h4'>
                $3,024.00
            </Typography>
            <Typography color='text.secondary' sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link component={RouterLink} to='/statistics'>
                    View Statistics
                </Link>
            </div>
        </>
    );
};

export default Deposits;
