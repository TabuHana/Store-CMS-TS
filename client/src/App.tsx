import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import RequireAuth from './components/auth/RequireAuth';
import PersistedLogin from './components/auth/PersistedLogin';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const App = () => {
    const [open, setOpen] = useState(true);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <PersistedLogin>
            <RequireAuth>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header handleDrawer={handleDrawer} />
                    <Navbar open={open} />
                    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <Outlet />
                    </Box>
                </Box>
            </RequireAuth>
        </PersistedLogin>
    );
};

export default App;
