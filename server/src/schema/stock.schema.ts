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

export const createStockSchema = object({
    ...payload,
});

export const updateStockSchema = object({
    ...payload,
    ...params,
});

export const deleteStockSchema = object({
    ...params,
});

export const getStockSchema = object({
    ...params,
});

export type CreateStockInput = TypeOf<typeof createStockSchema>;
export type UpdateStockInput = TypeOf<typeof updateStockSchema>;
export type DeleteStockInput = TypeOf<typeof deleteStockSchema>;
export type GetStockInput = TypeOf<typeof getStockSchema>;
