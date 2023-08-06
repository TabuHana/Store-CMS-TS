import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Link as LinkTo } from 'react-router-dom';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

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
                <Link color='primary' href='#' onClick={preventDefault}>
                    <LinkTo to='/statistics'>View Statistics</LinkTo>
                </Link>
            </div>
        </>
    );
};

export default Deposits;
