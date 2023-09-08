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
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuthContext from '../../hooks/useAuthContext';

const loginUserSchema = object({
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
});

type loginUserInput = TypeOf<typeof loginUserSchema>;

// ======================================== //

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<loginUserInput>({
        resolver: zodResolver(loginUserSchema),
    });

    const formSubmit: SubmitHandler<loginUserInput> = async (data) => {
        // console.log(data);

        const response = await axios.post('/api/user/login', data);

        setAuth(response.data);

        navigate('/dashboard');
    };
    return (
        <>
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                <Typography component='h3' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ height: 1, width: 135, mr: 1 }}>
                        <hr />
                    </Box>
                    Login
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
                    id='email'
                    label='Email Address'
                    autoFocus
                    variant='outlined'
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
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register('password')}
                />

                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link color='inherit' component={RouterLink} to='/auth/register'>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link color='inherit' component={RouterLink} to='/auth/register'>
                            Don't have an account? Sign up!
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default Login;
