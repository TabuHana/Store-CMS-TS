import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';

export const headerListItems = [
    {
        id: 0,
        icon: <PersonIcon />,
        label: 'Profile',
        route: 'profile',
    },
    {
        id: 1,
        icon: <LockIcon />,
        label: 'Change Password',
        route: 'change-password',
    },
    {
        id: 2,
        icon: <LogoutIcon />,
        label: 'Sign Out',
        route: 'sign-out'
    }
];
