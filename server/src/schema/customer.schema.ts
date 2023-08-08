import { TypeOf, object, string } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: 'Email is required',
        }),
        email: string({
            required_error: 'Password is required',
        }),
        billing_address: string({
            required_error: 'Password is required',
        }),
        shipping_address: string({
            required_error: 'Password is required',
        }),
    }),
};

const params = {
    params: object({
        customerId: string({
            required_error: 'Customer_id is required',
        }),
    }),
};

export const createCustomerSchema = object({
    ...payload,
});

export const updateCustomerSchema = object({
    ...payload,
    ...params,
});

export const deleteCustomerSchema = object({
    ...params,
});

export const getCustomerSchema = object({
    ...params,
});

export type CreateCustomerInput = TypeOf<typeof createCustomerSchema>;
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>;
export type DeleteCustomerInput = TypeOf<typeof deleteCustomerSchema>;
export type GetCustomerInput = TypeOf<typeof getCustomerSchema>;
