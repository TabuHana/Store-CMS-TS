import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';
// import Header from '../components/Header';
import Nav from '../components/Nav';
import { Button } from '@mui/material';
import { Link as Linker } from 'react-router-dom';

const NotFoundPage = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <Header open={open} toggle={toggleDrawer} /> */}
            <Nav open={open} toggle={toggleDrawer} />
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
                        <Linker to='/dashboard'>
                            <Button variant='contained'>Return Home</Button>
                        </Linker>
                    </div>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};
export default NotFoundPage;
