import { useRouteError } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const ErrorPage = () => {
    const error: any = useRouteError();
    console.error(error);

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

                    <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
                        Sorry!
                    </Typography>
                </Box>
                <Typography component='h2' variant='h6' sx={{ mt: 1, mx: 'auto' }}>
                    Seems as if an unexpected error has occured.
                </Typography>
            </Box>
            <Typography component='h6' variant='body1' sx={{ mt: 1, mx: 'auto' }}>
                <i>{error.statusText || error.message}</i>
            </Typography>
        </Box>
    );
};
