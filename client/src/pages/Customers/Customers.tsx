import { useState } from 'react';
import { Box } from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import {
    GridColDef,
    GridActionsCellItem,
    GridRowModesModel,
    GridRowModes,
    GridRowId,
    GridEventListener,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import BasicCard from '../../components/BasicCard/BasicCard';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import deepEqual from '../../utils/objectCompare';

type Customer = {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
};

const Customers = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const getCustomers = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const customers = await axiosPrivate.get('/api/customers');
            setRows(customers.data);
            return customers.data;
        },
    });

    const deleteCustomer = useMutation({
        mutationFn: async (id: GridRowId) => {
            const deletedCustomer = await axiosPrivate.delete(`/api/customers/${id}`);
            return deletedCustomer;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(['customers']);
        },

        onError: () => {
            console.log('ERROR DELETING');
        },
    });

    const updateCustomer = useMutation({
        mutationFn: async (data: Customer) => {
            const updatedCustomer = await axiosPrivate.put(`/api/customers/${data.id}`, data);
            return updatedCustomer;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(['customers']);
        },

        onError: () => {
            console.log('ERROR DELETING');
        },
    });

    const initialRows: Customer[] = [];

    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        console.log('edit');
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        console.log('save');
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        console.log(id);
        console.log('delete');
        deleteCustomer.mutate(id);
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        console.log('cancal');
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = (newRow: Customer) => {
        updateCustomer.mutate(newRow);
        setRows(rows.map((row) => (deepEqual(row, newRow) ? newRow : row)));
        return newRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        console.log('mode');
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180, align: 'left', headerAlign: 'left', editable: true },
        { field: 'email', headerName: 'E-mail', width: 180, editable: true },
        { field: 'phone', headerName: 'Phone Number', width: 160, editable: true },
        { field: 'address', headerName: 'Address', width: 220, editable: true },
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
        <Box
            sx={{
                height: 400,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
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
                        new customer
                    </Button>
                }
                content={
                    <DataTable
                        rows={rows}
                        columns={columns}
                        model={rowModesModel}
                        modelModeChange={handleRowModesModelChange}
                        modeEditStop={handleRowEditStop}
                        processUpdate={processRowUpdate}
                        loading={getCustomers.isLoading}
                    />
                }
            />
        </Box>
    );
};
export default Customers;
