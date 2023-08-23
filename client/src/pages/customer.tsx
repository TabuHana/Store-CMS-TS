import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Paper from '@mui/material/Paper';
import NewCustomer from '../components/createCustomer';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../utils/fetcher';

// function isValidPhoneNumber(input: string) {
//     const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
//     return phoneNumberRegex.test(input);
// }

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        editable: false,
        width: 150,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'Phone Number',
        width: 180,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 350,
        editable: true,
    },
];

var rows: GridRowsProp = [];

const Customers = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const { data, error } = useQuery({ queryKey: ['customers'], queryFn: getCustomers });

    if (data) {
        rows = data;
    }

    if (error) {
        console.log(error);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} toggle={toggleDrawer} msg={'Customers'} />
            <Navbar open={open} toggle={toggleDrawer} />
            <Box
                component='main'
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        {/* <Button variant='contained' sx={{ mb: 2 }}>
                            Add new customer
                        </Button> */}
                    </Box>
                    <Box sx={{ height: '100%', width: '100%' }} component={Paper}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            processRowUpdate={(updatedRow) => console.log(updatedRow)}
                            onProcessRowUpdateError={(error) => console.log(error)}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick={false}
                        />
                    </Box>
                    <NewCustomer />
                </Container>
            </Box>
        </Box>
    );
};
export default Customers;
