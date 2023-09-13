import BasicCard from '../../components/BasicCard/BasicCard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useForm } from 'react-hook-form';

const NewCustomer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const formSubmit = () => {
        console.log('hello');
    };

    return (
        <div>
            <BasicCard
                header={'New Customer'}
                content={
                    <>
                        <Box
                            component='form'
                            sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', padding: '.5rem 1rem'}}
                            noValidate
                            autoComplete='off'
                            onSubmit={handleSubmit(formSubmit)}
                        >
                            <TextField
                                margin='normal'
                                required
                                id='name'
                                label='Name'
                                variant='standard'
                                placeholder='John Doe*'
                                sx={{ m: 1, width: '50ch' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.email)}
                                {...register('email')}
                            />

                            <TextField
                                margin='normal'
                                required
                                id='email'
                                label='Email Address'
                                variant='standard'
                                placeholder='johnDoe@email.com'
                                sx={{ m: 1, width: '50ch' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.email)}
                                {...register('email')}
                            />
                            <TextField
                                margin='normal'
                                required
                                id='phone'
                                label='Phone Number'
                                variant='standard'
                                placeholder='123-123-1234'
                                sx={{ m: 1, width: '50ch' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.email)}
                                {...register('email')}
                            />
                            <TextField
                                margin='normal'
                                required
                                id='address'
                                label='Address'
                                variant='standard'
                                placeholder='123 Street St.'
                                sx={{ m: 1, width: '50ch' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.email)}
                                {...register('email')}
                            />
                            <Button
                            type='submit'
                            variant='contained'
                            startIcon={<SaveIcon />}
                            size='small'
                            sx={{ mt: 3, fontSize: '.8rem', width: '12ch' }}
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                        </Box>
                        
                    </>
                }
            />
        </div>
    );
};
export default NewCustomer;
