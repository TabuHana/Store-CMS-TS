import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './context/ThemeContext';

const App = () => {
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <Router>
                    <Header handleDrawer={handleDrawer}/>
                    <Navbar open={open}/>
                    {/* <MiniDrawer open={open} handleDrawer={handleDrawer} /> */}
                    {/* <Router> */}
                    {/* <Navbar /> */}
                    {/* <Routes> */}
                    {/* <Route path='dashboard' element={<Dashboard />} /> */}
                    {/* </Routes> */}
                    {/* </Router> */}
                </Router>
            </Box>
        </ThemeProvider>
    );
};

export default App;
