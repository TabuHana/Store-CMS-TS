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
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

console.log(`env ${import.meta.env.VITE_SERVER_ENDPOINT}`);

const createUserSchema = object({
    name: string().nonempty({
        message: 'Name is required',
    }),
    password: string().min(6, 'Password too short - must be 6 characters long').nonempty({
        message: 'Password is required',
    }),
    passwordConfirmation: string({
        required_error: 'Password confirmation is required',
    }),
    email: string({
        required_error: 'Email is required',
    })
        .email('Not a valid email')
        .nonempty({ message: 'Email is required' }),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

const RegisterPage = () => {
    const submitForm = async (values: CreateUserInput) => {
        try {
            await axios.post(`/api/users`, values)

        } catch (e) {
            console.log(e);
        }
        console.log({ values });
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });

    console.log(errors)

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
                <Box component='form' onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
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
