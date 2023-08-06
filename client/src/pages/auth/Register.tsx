import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../../components/Footer';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            passwordConfirmation: data.get('passwordConfirmation')
        });
    };

    const {
        register,
    } = useForm();

    return (
        <Container maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='name'
                        label='Username'
                        autoComplete='name'
                        autoFocus
                        {...register('name')}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        autoComplete='email'
                        autoFocus
                        {...register('email')}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='user-password'
                        {...register('password')}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        label='Confirm Password'
                        type='password'
                        id='passwordConfirmation'
                        autoComplete='user-passwordConfirmation'
                        {...register('passwordConfirmation')}
                    />
                    <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                </Box>
            </Box>
            <Footer />
        </Container>
    );
};

export default RegisterPage;
