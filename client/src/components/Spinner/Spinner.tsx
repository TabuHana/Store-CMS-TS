import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import LayersIcon from '@mui/icons-material/Layers';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <CssBaseline />

            <Box sx={{ m: 4, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar sx={{ my: 1, mr: 1, bgcolor: 'secondary.main', width: 40, height: 40 }}>
                        <LayersIcon sx={{ width: 25, height: 25 }} />
                    </Avatar>
                    <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
                        Store CMS
                    </Typography>
                </Box>
                <Typography component='h2' variant='h6' sx={{ mt: 1, mx: 'auto' }}>
                    Elevate your online business today
                </Typography>
            </Box>
            <CircularProgress size='5rem' color='info' />
        </Box>
    );
};
export default Spinner;
