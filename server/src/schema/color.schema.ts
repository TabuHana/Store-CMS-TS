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

export const createColorSchema = object({
    ...payload,
});

export const updateColorSchema = object({
    ...payload,
    ...params,
});

export const deleteColorSchema = object({
    ...params,
});

export const getColorSchema = object({
    ...params,
});

export type CreateColorInput = TypeOf<typeof createColorSchema>;
export type UpdateColorInput = TypeOf<typeof updateColorSchema>;
export type DeleteColorInput = TypeOf<typeof deleteColorSchema>;
export type GetColorInput = TypeOf<typeof getColorSchema>;
