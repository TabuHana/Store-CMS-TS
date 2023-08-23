import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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

    return (
        <Box component={Paper} sx={{ my: 4 }}>
            <Box component='form' sx={{ p: 2 }} noValidate onSubmit={handleSubmit(formSubmit)}>
                <TextField
                    margin='dense'
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    autoComplete='name'
                    autoFocus
                    {...register('name')}
                />
                <>{errors?.name?.message}</>
                <TextField
                    margin='dense'
                    required
                    fullWidth
                    id='phone'
                    label='Phone Number'
                    autoComplete='phone'
                    autoFocus
                    {...register('phone')}
                />
                <>{errors?.phone?.message}</>
                <TextField
                    margin='dense'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    autoComplete='email'
                    autoFocus
                    {...register('email')}
                />
                <>{errors?.email?.message}</>
                <TextField
                    margin='dense'
                    required
                    fullWidth
                    id='address'
                    label='Address'
                    autoComplete='address'
                    autoFocus
                    {...register('address')}
                />
                <>{errors?.address?.message}</>
                <Button type='submit' variant='contained' sx={{ m: 'auto', my: 1, display: 'block', width: 300 }}>
                    Add Customer
                </Button>
                <div></div>
            </Box>
        </Box>
    );
};
export default NewCustomer;
