import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({
    rows,
    columns,
    loading,
    sx,
    mode,
    model,
    modelModeChange,
    modeEditStop,
    processUpdate,
    slotProps,
}: any) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode={mode}
            loading={loading}
            sx={sx}
            autoPageSize={true}
            rowModesModel={model}
            onRowModesModelChange={modelModeChange}
            onRowEditStop={modeEditStop}
            processRowUpdate={processUpdate}
            slotProps={slotProps}
        />
    );
};
export default DataTable;
