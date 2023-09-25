import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({
    rows,
    columns,
    loading,
    model,
    modelModeChange,
    modeEditStop,
    processUpdate,
}: any) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            sx={{ height: '371px'}}
            loading={loading}
            rowModesModel={model}
            onRowModesModelChange={modelModeChange}
            onRowEditStop={modeEditStop}
            processRowUpdate={processUpdate}
            pageSizeOptions={[5]}
        />
    );
};
export default DataTable;
