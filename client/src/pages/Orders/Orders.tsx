import { Box } from '@mui/material';
// import DataTable from '../../components/DataTable/DataTable';
// import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const Orders = () => {
    // const axiosPrivate = useAxiosPrivate()
    // const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: async () => {
    //     const orders = await axiosPrivate.get('/api/orders')

    //     return orders.data
    // } });

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            {/* <DataTable rows={data ? data : rows} columns={columns} loading={isLoading} sx={orderTableStyles} /> */}
            <p>Orders coming soon!</p>
        </Box>
    );
};
export default Orders;
