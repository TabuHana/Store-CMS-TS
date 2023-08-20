import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LayersIcon from '@mui/icons-material/Layers';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

const createUserSchema = object({
    name: string().nonempty({
        message: 'Name is required',
    }),
    password: string().min(6, 'Password too short - should be 6 chars minimum').nonempty({
        message: 'Password is required',
    }),
    passwordConfirmation: string().nonempty({
        message: 'passwordConfirmation is required',
    }),
    email: string({
        required_error: 'Email is required',
    })
        .email('Not a valid email')
        .nonempty({
            message: 'Password is required',
        }),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

type RegisterProps = {
    alert: (message: string) => void;
};

const RegisterPage: React.FC<RegisterProps> = ({ alert }) => {
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });

    const formSubmit = async (values: CreateUserInput) => {
        // const signIn = { email: values.email, password: values.password };

        console.log(`checking correct end point = ${import.meta.env.VITE_SERVER_ENDPOINT}`)

        try {
            const user = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/user`, values, { withCredentials: true });

            console.log(`user create = ${user}`)
            // await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`, signIn, { withCredentials: true });
            alert('Welcome to Store-CMS!');
            navigate('/dashboard');
        } catch (e: any) {
            console.log(errors);
            setRegisterError(e.message);
            alert(registerError);
        }
    };

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
                <Avatar sx={{ my: 1, mr: 1, bgcolor: 'primary.main', width: 40, height: 40 }}>
                    <LayersIcon sx={{ width: 25, height: 25 }} />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component='form' onSubmit={handleSubmit(formSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='name'
                        type='text'
                        label='Name'
                        autoComplete='name'
                        autoFocus
                        {...register('name')}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        type='email'
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
                    {/* This is a remember me button. Do not know how to use */}
                    {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */} 
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
