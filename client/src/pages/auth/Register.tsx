import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';

const registerUserSchema = object({
    name: string().nonempty({
        message: 'Name is required',
    }),
    email: string({
        required_error: 'Email is required',
    })
        .email('Not a valid email')
        .nonempty({
            message: 'Password is required',
        }),
    password: string().min(6, 'Password too short - should be 6 chars minimum').nonempty({
        message: 'Password is required',
    }),
    passwordConfirmation: string().nonempty({
        message: 'Password Confirmation is required',
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
});

type RegisterUserInput = TypeOf<typeof registerUserSchema>;

// ======================================== //

const Register = () => {
    const auth = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterUserInput>({
        resolver: zodResolver(registerUserSchema),
    });

    const formSubmit: SubmitHandler<RegisterUserInput> = async (data) => {
        auth.register(data);
    };

    return (
        <>
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                <Typography component='h3' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ height: 1, width: 135, mr: 1 }}>
                        <hr />
                    </Box>
                    Register
                    <Box sx={{ height: 1, width: 135, ml: 1 }}>
                        <hr />
                    </Box>
                </Typography>
            </Box>

            {/* Form */}
            <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(formSubmit)}>
                <TextField
                    margin='dense'
                    required
                    fullWidth
                    id='name'
                    type='text'
                    label='Name'
                    autoFocus
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    {...register('name')}
                />
                <TextField
                    margin='dense'
                    required
                    fullWidth
                    id='email'
                    type='email'
                    label='Email Address'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register('email')}
                />

                <TextField
                    margin='dense'
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    id='password'
                    {...register('password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                />

                <TextField
                    margin='dense'
                    required
                    fullWidth
                    label='Confirm Password'
                    type='password'
                    id='passwordConfirmation'
                    error={Boolean(errors.passwordConfirmation)}
                    helperText={errors.passwordConfirmation?.message}
                    {...register('passwordConfirmation')}
                />

                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item xs />
                    <Grid item>
                        <Link color='inherit' component={RouterLink} to='/auth/login'>
                            Already have an account? Sign in!
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default Register;
