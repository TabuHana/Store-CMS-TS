import { Box } from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import BasicCard from '../../components/BasicCard/BasicCard';
import AddIcon from '@mui/icons-material/Add';

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
    const axiosPrivate = useAxiosPrivate();
    const { data, isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const customers = await axiosPrivate.get('/api/customers');

            return customers.data;
        },
    });
    const navigate = useNavigate();

    console.log(data);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <BasicCard
                header={'Customers'}
                action={
                    <Button
                        variant='contained'
                        size='small'
                        endIcon={<AddIcon />}
                        onClick={() => navigate('/customers/new')}
                        sx={{fontSize: '.8rem'}}
                    >
                        new
                    </Button>
                }
                content={
                    <DataTable
                        rows={data ? data : rows}
                        columns={columns}
                        loading={isLoading}
                        sx={customerTableStyles}
                    />
                }
            />
        </Box>
    );
};
export default Customers;
