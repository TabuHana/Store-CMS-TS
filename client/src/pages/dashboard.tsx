import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stats from '../components/Stats';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

type User = {
    user_id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

const DashboardPage = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const { data } = useSWR<User | null>(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/me`, fetcher);

    function capitalizeFirstLetter(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    if (data) {
        const userName = capitalizeFirstLetter(data.name);

        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} toggle={toggleDrawer} name={userName} />
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
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Stats />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Deposits />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Orders />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Footer />
                    </Container>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <div>Login is Required</div>
            <div>Please Login</div>
        </>
    );
};
export default DashboardPage;
