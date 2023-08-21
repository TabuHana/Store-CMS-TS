import { getUser } from '../utils/fetcher';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';
// import Stats from '../components/Stats';
// import Deposits from '../components/Deposits';
// import Orders from '../components/Orders';

type User = {
    user_id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const { data, error } = useQuery<User | null>(['user'], getUser);

    console.log(error);

    if (data) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} toggle={toggleDrawer} name={data.name} />
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
                        {`Username: ${data.name}`}
                        {`Email: ${data.email}`}
                        {`User_id: ${data.user_id}`}
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
                                    {/* <Stats /> */}
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
                                    {/* <Deposits /> */}
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    {/* <Orders /> */}
                                </Paper>
                            </Grid>
                        </Grid>
                        <Footer />
                    </Container>
                </Box>
            </Box>
        );
    }

    return <div>Login failed</div>;
};
export default Dashboard;
