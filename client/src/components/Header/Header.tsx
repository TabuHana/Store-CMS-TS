import { useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { headerListItems } from './consts/headerListItems';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type HeaderProps = {
    handleDrawer: () => void;
};

const Header: React.FC<HeaderProps> = ({ handleDrawer }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: '.5rem' }}
                    onClick={handleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Application
                </Typography>
                <div>
                    <Button
                        id='menu-button'
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        color='inherit'
                        onClick={handleMenu}
                        sx={{ fontWeight: 'bold' }}
                    >
                        <AccountCircle sx={{ mr: '.6rem' }} />
                        Account
                    </Button>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {/* <MenuList>
                            {headerListItems.map((item) => (
                                <MenuItem key={item.id} onClick={handleClose} color='primary'>
                                    <ListItemIcon color='black'>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </MenuItem>
                            ))}
                        </MenuList> */}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
