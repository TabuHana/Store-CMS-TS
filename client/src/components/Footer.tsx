import { Link, Typography } from '@mui/material';

const Footer = (props: any) => {
    return (
        <footer>
            <Typography variant='body1' color='text.primary' align='center' {...props}>
                {/* {'Copyright © '} */}
                <Link color='inherit' href='https://github.com/TabuHana'>
                    Made with ❤️ by Tabu
                </Link>{' '}
            </Typography>
        </footer>
    );
};
export default Footer;
