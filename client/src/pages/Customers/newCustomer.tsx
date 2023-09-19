import BasicCard from '../../components/BasicCard/BasicCard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const newCustomerSchema = object({
    name: string().nonempty({
        message: 'Name is required',
    }),
    email: string()
        .nonempty({
            message: 'Email is required',
        })
        .email('Not a valid Email'),
    phone: string().nonempty({
        message: 'Phone Number is required',
    }),
    address: string().nonempty({
        message: 'Address is required',
    }),
});

type newCustomerInput = TypeOf<typeof newCustomerSchema>;

const NewCustomer = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<newCustomerInput>({
        resolver: zodResolver(newCustomerSchema),
    });

    const createCustomerMutation = useMutation({
        mutationFn: async (data: newCustomerInput) => {
            const newCustomer = await axiosPrivate.post('/api/customers', data);

            return newCustomer.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['customers'])
        }
    })

    const formSubmit: SubmitHandler<newCustomerInput> = async (data) => {
        createCustomerMutation.mutate(data)

        navigate('/customers');

    };

    return (
        <div>
            <BasicCard
                header={'New Customer'}
                content={
                    <>
                        <Box
                            component='form'
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '2rem',
                                padding: '.5rem 1rem',
                            }}
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
                                error={Boolean(errors.name)}
                                {...register('name')}
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
                                error={Boolean(errors.phone)}
                                {...register('phone')}
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
                                error={Boolean(errors.address)}
                                {...register('address')}
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
