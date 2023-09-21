import { useState } from 'react';
import { Box } from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import {
    GridRowsProp,
    GridColDef,
    GridActionsCellItem,
    GridRowModesModel,
    GridRowModel,
    GridRowModes,
    GridRowId,
    GridEventListener,
    GridRowEditStopReasons
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import BasicCard from '../../components/BasicCard/BasicCard';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

const initialRows: GridRowsProp = [];

const customerTableStyles = {
    height: '371px',
};

const Customers = () => {
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const axiosPrivate = useAxiosPrivate();
    const { isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const customers = await axiosPrivate.get('/api/customers');
            setRows(customers.data);
            return customers.data;
        },
    });
    const navigate = useNavigate();

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        console.log(id);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        console.log(id);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        console.log(id);
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'E-mail', width: 150 },
        { field: 'phone', headerName: 'Phone Number', width: 150 },
        { field: 'address', headerName: 'Address', width: 150 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
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
                        mode='row'
                        loading={isLoading}
                        sx={customerTableStyles}
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        slotProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
                    />
                }
            />
        </Box>
    );
};
export default Customers;
