import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer'>
            <Typography variant='body1' color='text.primary' align='center' sx={{ pt: 4 }}>
                <Link
                    component={RouterLink}
                    to='https://github.com/TabuHana'
                    target='_blank'
                    rel='noreferrer'
                    underline='always'
                    color='inherit'
                >
                    Made with ❤️ by Nathan Marcellous
                </Link>
            </Typography>
        </footer>
    );
};
export default Footer;
