import { useState } from 'react';
import Box from '@mui/material/Box';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AboutMe = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Link onClick={handleOpen} underline='none' color='inherit'>
                <ListItemButton>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary='About' />
                </ListItemButton>
            </Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        About Me
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <p>
                            Store-CMS is a robust and user-friendly content management system tailored for small
                            businesses.
                        </p>
                        <p>Made with ❤️ by Nathan Marcellous</p>
                        <p>
                            For questions email: {' '}
                            <Link>nate31196@outlook.com</Link>
                        </p>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default AboutMe;
