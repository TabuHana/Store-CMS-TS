import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const NotFound = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar open={open} toggle={toggleDrawer} />
            <Box
                component='main'
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                    <div className='not-found'>
                        <h1>Page Not Found!</h1>
                        <RouterLink to='/dashboard'>
                            <Button variant='contained'>Return Home</Button>
                        </RouterLink>
                    </div>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};
export default NotFound;