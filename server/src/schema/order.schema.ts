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

export const createOrderSchema = object({
    ...payload,
});

export const updateOrderSchema = object({
    ...payload,
    ...params,
});

export const deleteOrderSchema = object({
    ...params,
});

export const getOrderSchema = object({
    ...params,
});

export type CreateOrderInput = TypeOf<typeof createOrderSchema>;
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>;
export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>;
export type GetOrderInput = TypeOf<typeof getOrderSchema>;
