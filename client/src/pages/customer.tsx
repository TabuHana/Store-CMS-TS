import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const rows = [
    {
        id: 1,
        name: 'Snow Jon',
        phone: '791-675-8914',
        email: 'atuny0@sohu.com',
        address: '1745 T Street Southeast, Washington DC',
    },
    {
        id: 2,
        name: 'Lannister Cersei',
        phone: '813-117-7139',
        email: 'hbingley1@plala.or.jp',
        address: '6007 Applegate Lane, Louisville KY',
    },
    {
        id: 3,
        name: 'Lannister Jaime',
        phone: '739-292-7942',
        email: 'rshawe2@51.la',
        address: '560 Penstock Drive, Grass Valley CA',
    },
    {
        id: 4,
        name: 'Stark Arya',
        phone: '461-145-4186',
        email: 'yraigatt3@nature.com',
        address: '150 Carter Street, Manchester CT',
    },
    {
        id: 5,
        name: 'Targaryen Daenerys',
        phone: '285-771-1911',
        email: 'kmeus4@upenn.edu',
        address: '2721 Lindsay Avenue, Louisville KY',
    },
    {
        id: 6,
        name: 'Melisandre Quigley',
        phone: '912-100-5118',
        email: 'bleveragei@so-net.ne.jp',
        address: '5403 Illinois Avenue, Nashville TN',
    },
    {
        id: 7,
        name: 'Clifford Ferrara',
        phone: '581-108-7855',
        email: 'beykelhofm@wikispaces.com',
        address: '81 Seaton Place Northwest, Washington DC',
    },
    {
        id: 8,
        name: 'Frances Rossini',
        phone: '533-708-0340',
        email: 'lgronaverp@cornell.edu',
        address: '5601 West Crocus Drive, Glendale AZ',
    },
    {
        id: 9,
        name: 'Roxie Harvey',
        phone: '886-766-8617',
        email: 'jissetts@hostgator.com',
        address: '629 Debbie Drive, Nashville TN',
    },
    {
        id: 10,
        name: 'Gust Purdy',
        phone: '886-889-0258"',
        email: 'sberminghamh@chron.com',
        address: '5461 West Shades Valley Drive, Montgomery AL',
    },
];

function isValidPhoneNumber(input: string) {
    const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberRegex.test(input);
}

const columns: GridColDef[] = [
    // { field: 'customer_id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 220,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 220,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'Phone Number',
        width: 220,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 400,
        editable: true,
    },
];

const Customers = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    console.log(isValidPhoneNumber('123-456-7890'));
    console.log(isValidPhoneNumber('987-654-3210'));
    console.log(isValidPhoneNumber('1234567890'));
    console.log(isValidPhoneNumber('abc-def-ghij'));

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
                    <Box sx={{display: 'flex', justifyContent: 'end'}}>
                        <Button variant='contained' sx={{ mb: 2 }}>
                            Add new customer
                        </Button>
                    </Box>
                    <Box sx={{ height: '100%', width: '100%' }} component={Paper}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 6,
                                    },
                                },
                            }}
                            pageSizeOptions={[6]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};
export default Customers;
