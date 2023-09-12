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

const customerTableStyles = {
    height: '371px',
};

const Customers = () => {
    const query = useQuery({ queryKey: ['customers'], queryFn: getCustomers });

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataTable
                rows={query.data ? query.data : rows}
                columns={columns}
                loading={!query.data}
                sx={customerTableStyles}
            />
        </Box>
    );
};
export default Customers;
