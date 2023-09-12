import { Box } from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
    const axiosPrivate = useAxiosPrivate()
    const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: async () => {
        const orders = await axiosPrivate.get('/api/orders')

        return orders.data
    } });

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataTable rows={data ? data : rows} columns={columns} loading={isLoading} sx={orderTableStyles} />
        </Box>
    );
};
export default Orders;
