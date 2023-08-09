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

export const createItemSchema = object({
    ...payload,
});

export const updateItemSchema = object({
    ...payload,
    ...params,
});

export const deleteItemSchema = object({
    ...params,
});

export const getItemSchema = object({
    ...params,
});

export type CreateItemInput = TypeOf<typeof createItemSchema>;
export type UpdateItemInput = TypeOf<typeof updateItemSchema>;
export type DeleteItemInput = TypeOf<typeof deleteItemSchema>;
export type GetItemInput = TypeOf<typeof getItemSchema>;
