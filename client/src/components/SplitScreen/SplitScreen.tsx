import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LayersIcon from '@mui/icons-material/Layers';
import CssBaseline from '@mui/material/CssBaseline';

// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';

const SplitScreen = () => {
    // const [user, setUser] = useState('');
    // const auth = useAuth();
    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />

            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                    <Outlet />
                </Box>
                <Box sx={{ m: 'auto', width: 200 }}></Box>
            </Grid>
        </Grid>
    );
};
export default SplitScreen;
