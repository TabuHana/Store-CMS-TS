import * as React from 'react';
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
import { Link as Linker } from 'react-router-dom';

const LoginPage = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                            <LayersIcon sx={{ width: 20, height: 20 }} />
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
                        <Typography component='h3' variant='body1' sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ height: 1, width: 135, mr: 1 }}>
                                <hr />
                            </Typography>
                            Login
                            <Typography sx={{ height: 1, width: 135, ml: 1 }}>
                                <hr />
                            </Typography>
                        </Typography>
                        <Box component='form' noValidate onSubmit={handleSubmit}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
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
                                    <Linker to='#'>
                                        <Link variant='body2'>Forgot password?</Link>
                                    </Linker>
                                </Grid>
                                <Grid item>
                                    <Linker to='/register'>
                                        <Link variant='body2'>Don't have an account? Sign Up</Link>
                                    </Linker>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
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
        </Grid>
    );
};

export default LoginPage;
