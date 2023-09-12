import { Box } from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../../utils/fetchers';

const rows: GridRowsProp = [];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 150 },
];

const orderTableStyles = {
    height: '371px',
};

const Orders = () => {
    const query = useQuery({ queryKey: ['orders'], queryFn: getCustomers });

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataTable
                rows={rows}
                columns={columns}
                loading={!query.data}
                sx={orderTableStyles}
            />
        </Box>
    );
};
export default Orders;
