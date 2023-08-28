import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <DashboardIcon />,
        label: 'Dashboard',
        route: 'dashboard',
    },
    {
        id: 1,
        icon: <PeopleIcon />,
        label: 'Customers',
        route: 'customers',
    },
    {
        id: 2,
        icon: <InventoryIcon />,
        label: 'Products',
        route: 'products',
    },
    {
        id: 3,
        icon: <LocalShippingIcon />,
        label: 'Orders',
        route: 'orders',
    },
];
