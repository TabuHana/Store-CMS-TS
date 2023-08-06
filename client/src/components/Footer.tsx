import { Link, Typography } from '@mui/material';

const Footer = () => {
    return (
        <footer className='footer'>
                <Typography variant='body1' color='text.primary' align='center' sx={{ pt: 4 }}>
                    <Link color='inherit' href='https://github.com/TabuHana'>
                        Made with ❤️
                    </Link>
                </Typography>
        </footer>
    );
};
export default Footer;
