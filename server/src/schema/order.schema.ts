import { TypeOf, object, number, string, boolean } from 'zod';

const payload = {
    body: object({
        sub_total: string({
            required_error: 'Sub_total is required',
            invalid_type_error: 'Sub_total must be a string',
        }),
        total: string({
            required_error: 'Total is required',
            invalid_type_error: 'Total must be a string',
        }),
        shipping_address: string({
            required_error: 'Shipping Address is required',
            invalid_type_error: 'Shipping Address must be a string',
        }),
        billing_address: string({
            required_error: 'Billing Address is required',
            invalid_type_error: 'Billing Address must be a string',
        }),
        status: boolean({
            required_error: 'Status is required',
            invalid_type_error: 'Status must be a boolean',
        }),
        customer_id: string({
            required_error: 'Customer_id is required',
            invalid_type_error: 'Customer_id must be a string',
        }),
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

export const createOrderSchema = object({
    ...payload,
});

export const updateOrderSchema = object({
    ...payload,
    ...params,
});

export const getOrderSchema = object({
    ...params,
});

export type CreateOrderInput = TypeOf<typeof createOrderSchema>;
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>;
export type GetOrderInput = TypeOf<typeof getOrderSchema>;
