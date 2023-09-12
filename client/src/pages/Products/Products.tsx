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

const customerTableStyles = {
    height: '371px',
};

const Products = () => {
    const axiosPrivate = useAxiosPrivate()
    const { data, isLoading } = useQuery({ queryKey: ['products'], queryFn: async () => {
        const products = await axiosPrivate.get('/api/products')

        return products.data
    } });

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataTable rows={data ? data : rows} columns={columns} loading={isLoading} sx={customerTableStyles} />
        </Box>
    );
};
export default Products;
