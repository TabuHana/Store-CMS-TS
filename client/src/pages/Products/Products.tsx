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

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    price_per_unit: number;
};

const Products = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const getProducts = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const products = await axiosPrivate.get('/api/products');
            setRows(products.data);
            return products.data;
        },
    });

    const deleteProduct = useMutation({
        mutationFn: async (id: GridRowId) => {
            const deletedProduct = await axiosPrivate.delete(`/api/products/${id}`);
            return deletedProduct;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },

        onError: () => {
            console.log('ERROR DELETING');
        },
    });

    const updateProduct = useMutation({
        mutationFn: async (data: Product) => {
            const updatedProduct = await axiosPrivate.put(`/api/products/${data.id}`, data);
            return updatedProduct;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },

        onError: () => {
            console.log('ERROR DELETING');
        },
    });

    const initialRows: Product[] = [];

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
        deleteProduct.mutate(id);
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        console.log('cancal');
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = (newRow: Product) => {
        updateProduct.mutate(newRow);
        setRows(rows.map((row) => (deepEqual(row, newRow) ? newRow : row)));
        return newRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        console.log('mode');
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180, align: 'left', headerAlign: 'left', editable: true },
        { field: 'description', headerName: 'Description', width: 220, editable: true },
        { field: 'price', headerName: 'Price', width: 160, editable: true },
        { field: 'price_per_unit', headerName: 'Price per Unit', width: 180, editable: true },
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
                header={'Products'}
                action={
                    <Button
                        variant='contained'
                        size='small'
                        endIcon={<AddIcon />}
                        onClick={() => navigate('/customers/new')}
                        sx={{ fontSize: '.8rem' }}
                    >
                        new product
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
                        loading={getProducts.isLoading}
                    />
                }
            />
        </Box>
    );
};
export default Products;
