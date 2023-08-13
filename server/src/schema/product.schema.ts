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

export const createProductSchema = object({
    ...payload,
});

export const updateProductSchema = object({
    ...payload,
    ...params,
});

export const deleteProductSchema = object({
    ...params,
});

export const getProductSchema = object({
    ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
