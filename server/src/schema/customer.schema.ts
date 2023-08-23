import { TypeOf, object, string } from 'zod';

const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const payload = {
    body: object({
        name: string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        phone: string({
            required_error: 'Phone Number is required',
            invalid_type_error: 'Phone Number must be a string',
        }),
        email: string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        }),
        address: string({
            required_error: 'Address is required',
            invalid_type_error: 'Address must be a string',
        }),
    })
        .refine((data) => phoneNumberRegex.test(data.phone), {
            message: 'Must be a valid phone number',
            path: ['phone'],
        })
        .refine((data) => emailRegex.test(data.email), {
            message: 'Must be a valid email',
            path: ['email'],
        }),
};

const params = {
    params: object({
        customerId: string({
            required_error: 'Customer_id is required',
            invalid_type_error: 'Customer_id must be a string',
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

export const getCustomerSchema = object({
    ...params,
});

export type CreateCustomerInput = TypeOf<typeof createCustomerSchema>;
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>;
export type GetCustomerInput = TypeOf<typeof getCustomerSchema>;
