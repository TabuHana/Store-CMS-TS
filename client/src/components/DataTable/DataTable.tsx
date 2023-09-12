import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ rows, columns, loading, sx }: any) => {
    return <DataGrid rows={rows} columns={columns} loading={loading} sx={sx} autoPageSize={true} />;
};
export default DataTable;
