import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';


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
];

// {
//     id: 1,
//     icon: <LogoutIcon />,
//     label: 'Sign Out',
//     route: function () {
//         axios.delete('/api/sesssions/delete');
//         <Navigate to='/auth/login' />
//     },
// },
