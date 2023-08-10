import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LayersIcon from '@mui/icons-material/Layers';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginUserSchema = object({
    email: string().email('Not a valid email').nonempty({ message: 'Email is required' }),
    password: string().nonempty({ message: 'Password is required' }),
});

type LoginUserInput = TypeOf<typeof loginUserSchema>;

const LoginPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
    });

    const navigate = useNavigate()

    const notify = () =>
        toast('🦄 Wow so easy!', {
            position: 'bottom-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
        });

    const formSubmit = async (values: LoginUserInput) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`, values);
            notify()
            navigate('/dashboard');
        } catch (e: any) {
            console.log(e);
        }
    };

    const demoSubmit = {
        email: 'asdf@test.com',
        password: 'password123',
    };

    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar sx={{ my: 1, mr: 1, bgcolor: 'primary.main', width: 40, height: 40 }}>
                            <LayersIcon sx={{ width: 25, height: 25 }} />
                        </Avatar>

                        <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
                            Store CMS
                        </Typography>
                    </Box>
                    <Typography component='h2' variant='h6' sx={{ mt: 1, mx: 'auto' }}>
                        Elevate your online business today
                    </Typography>

                    <Box
                        component='section'
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 6 }}
                    >
                        <Typography component='h3' sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ height: 1, width: 135, mr: 1 }}>
                                <hr />
                            </Box>
                            Login
                            <Box sx={{ height: 1, width: 135, ml: 1 }}>
                                <hr />
                            </Box>
                        </Typography>
                        <Box component='form' noValidate onSubmit={handleSubmit(formSubmit)}>
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
                                autoComplete='current-password'
                                {...register('password')}
                            />
                            <FormControlLabel
                                control={<Checkbox value='remember' color='primary' />}
                                label='Remember me'
                            />
                            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link component={RouterLink} to='/' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link component={RouterLink} to='/register' variant='body2'>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ m: 'auto', width: 200 }}>
                    <Button
                        onClick={notify}
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
                    >
                        Demo the Site!
                    </Button>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <ToastContainer />
        </Grid>
    );
};

export default LoginPage;
