import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LayersIcon from '@mui/icons-material/Layers';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';

// onSubmit={handleSubmit(formSubmit)}

const Register = () => {
    return (
        <Box sx={{ m: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar sx={{ my: 1, mr: 1, bgcolor: 'secondary.main', width: 40, height: 40 }}>
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
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 6, mx: '3rem' }}
            >
                <Typography component='h3' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ height: 1, width: 135, mr: 1 }}>
                        <hr />
                    </Box>
                    Register
                    <Box sx={{ height: 1, width: 135, ml: 1 }}>
                        <hr />
                    </Box>
                </Typography>

                {/* Form */}
                <Box component='form' noValidate>
                    <TextField margin='normal' required fullWidth id='name' type='text' label='Name' autoFocus />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        type='email'
                        label='Email Address'
                    />
                    <TextField margin='normal' required fullWidth label='Password' type='password' id='password' />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        label='Confirm Password'
                        type='password'
                        id='passwordConfirmation'
                    />
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
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
            </Box>
        </Box>
    );
};
export default Register;
