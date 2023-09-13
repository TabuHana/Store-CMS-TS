import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const BasicCard = ({ header, content, action }: any) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardHeader title={header} />
            <CardContent>{content}</CardContent>
            <CardActions>{action}</CardActions>
        </Card>
    );
};
export default BasicCard;
