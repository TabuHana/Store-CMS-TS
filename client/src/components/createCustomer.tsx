import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createCustomerSchema = object({
    name: string().nonempty({
        message: 'Name is required',
    }),
    phone: string().nonempty({
        message: 'Phone Number is required',
    }),
    email: string().nonempty({
        message: 'Email is required',
    }),
    address: string().nonempty({
        message: 'Address is required',
    }),
});

type createCustomerInput = TypeOf<typeof createCustomerSchema>;

const NewCustomer = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<createCustomerInput>({
        resolver: zodResolver(createCustomerSchema),
    });

    const queryClient = useQueryClient();

    const formSubmit = async (values: any) => {
        createNewCustomer.mutate(values);
    };

    const createNewCustomer = useMutation({
        mutationFn: async (values: any) => {
            await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/customers`, values, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['customers']);
        },
    });

    console.log('errors: ', errors);

    return (
        <Box component='form' noValidate onSubmit={handleSubmit(formSubmit)}>
            <TextField
                margin='normal'
                required
                fullWidth
                id='name'
                label='Name'
                autoComplete='name'
                autoFocus
                {...register('name')}
            />
            <TextField
                margin='normal'
                required
                fullWidth
                id='phone'
                label='Phone Number'
                autoComplete='phone'
                autoFocus
                {...register('phone')}
            />
            <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email'
                autoComplete='email'
                autoFocus
                {...register('email')}
            />
            <TextField
                margin='normal'
                required
                fullWidth
                id='address'
                label='Address'
                autoComplete='address'
                autoFocus
                {...register('address')}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Add Customer
            </Button>
        </Box>
    );
};
export default NewCustomer;
