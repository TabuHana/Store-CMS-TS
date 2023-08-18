import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Divider, IconButton, List, Toolbar, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

type NavProps = {
    open: boolean;
    toggle: () => void;
};

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const Nav: React.FC<NavProps> = ({ open, toggle }) => {
    return (
        <Drawer variant='permanent' open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggle}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component='nav'>
                <>
                    <Link component={RouterLink} to='/dashboard' underline='none' color='inherit'>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItemButton>
                    </Link>
                    <Link component={RouterLink} to='/products' underline='none' color='inherit'>
                        <ListItemButton>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary='Products' />
                        </ListItemButton>
                    </Link>
                    <Link component={RouterLink} to='/customers' underline='none' color='inherit'>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary='Customers' />
                        </ListItemButton>
                    </Link>
                    <Link component={RouterLink} to='/orders' underline='none' color='inherit'>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalShippingIcon />
                            </ListItemIcon>
                            <ListItemText primary='Orders' />
                        </ListItemButton>
                    </Link>
                    <Link component={RouterLink} to='/statisitcs' underline='none' color='inherit'>
                        <ListItemButton>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary='Statistics' />
                        </ListItemButton>
                    </Link>
                </>
                <Divider sx={{ my: 1 }} />
                <>
                    <Link component={RouterLink} to='/settings' underline='none' color='inherit'>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Settings' />
                        </ListItemButton>
                    </Link>
                    <Link
                        component={RouterLink}
                        to='/'
                        underline='none'
                        color='inherit'
                        onClick={() => {
                            console.log('logout clicked');
                            axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`, {
                                withCredentials: true,
                            });
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                    </Link>
                </>
                <Divider sx={{ my: 1 }} />
                <>
                    <Link component={RouterLink} to='/aboutme' underline='none' color='inherit'>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary='About' />
                        </ListItemButton>
                    </Link>
                </>
            </List>
        </Drawer>
    );
};
export default Nav;
