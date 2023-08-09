import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link as Linker } from 'react-router-dom';

export const navigationItems = (
    <>
        <Linker to='/'>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
            </ListItemButton>
        </Linker>
        <Linker to='/inventory'>
            <ListItemButton>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary='Inventory' />
            </ListItemButton>
        </Linker>
        <Linker to='/customers'>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='Customers' />
            </ListItemButton>
        </Linker>
        <Linker to='/orders'>
            <ListItemButton>
                <ListItemIcon>
                    <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary='Orders' />
            </ListItemButton>
        </Linker>
        <Linker to='/statistics'>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Statistics' />
            </ListItemButton>
        </Linker>
    </>
);

export const userItems = (
    <>
        <Linker to='/settings'>
            <ListItemButton>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary='Settings' />
            </ListItemButton>
        </Linker>
        <Linker to='/logout'>
            <ListItemButton>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
            </ListItemButton>
        </Linker>
    </>
);

export const appItems = (
    <>
        <Linker to='/about'>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='About' />
            </ListItemButton>
        </Linker>
    </>
);
