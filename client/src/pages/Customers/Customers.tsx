import { useState } from 'react';
import { Box } from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import {
    GridColDef,
    GridActionsCellItem,
    GridRowModesModel,
    GridRowModel,
    GridRowModes,
    GridRowId,
    GridEventListener,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {  useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import BasicCard from '../../components/BasicCard/BasicCard';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


const initialRows = [{
    id: 1,
    name: '',
    phone: '',
    email: '',
    address: '',
}];

// const customerTableStyles = {
//     height: '371px',
// };

const Customers = () => {
    const axiosPrivate = useAxiosPrivate();
    const { isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const customers = await axiosPrivate.get('/api/customers');
            setRows(customers.data);
            return customers.data;
        },
    });

    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    // const addNewCustomer = useMutation({
    //     mutationFn: (newCustomer) => {
    //         return axiosPrivate.post('/todos', newCustomer);
    //     },
    // });

    const navigate = useNavigate();

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        console.log(id);
        console.log('handleDeleteClick');
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        console.log('handleCancelClick');
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow };
        console.log('processRowUpdate');
        console.log(updatedRow);
        // setRows();
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150, align: 'left', headerAlign: 'left', editable: true },
        { field: 'email', headerName: 'E-mail', width: 150, editable: true },
        { field: 'phone', headerName: 'Phone Number', width: 150, editable: true },
        { field: 'address', headerName: 'Address', width: 150, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            align: 'right',
            headerAlign: 'right',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label='Save'
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label='Cancel'
                            className='textPrimary'
                            onClick={handleCancelClick(id)}
                            color='inherit'
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label='Edit'
                        className='textPrimary'
                        onClick={handleEditClick(id)}
                        color='inherit'
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label='Delete'
                        onClick={handleDeleteClick(id)}
                        color='inherit'
                    />,
                ];
            },
        },
    ];

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
                        sx={{ fontSize: '.8rem' }}
                    >
                        new
                    </Button>
                }
                content={
                    <DataTable
                        rows={rows}
                        columns={columns}
                        editMode='row'
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        loading={isLoading}
                    />
                }
            />
        </Box>
    );
};
export default Customers;
