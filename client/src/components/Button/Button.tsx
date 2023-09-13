import { Button as MuiButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Button = ({ content }: any) => {
    return (
        <MuiButton
            variant='contained'
            color='secondary'
            size='small'
            sx={{ fontSize: '.8rem' }}
            endIcon={<AddIcon />}
        >
            {content}
        </MuiButton>
    );
};
export default Button;
