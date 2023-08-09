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

export const createCategorySchema = object({
    ...payload,
});

export const updateCategorySchema = object({
    ...payload,
    ...params,
});

export const deleteCategorySchema = object({
    ...params,
});

export const getCategorySchema = object({
    ...params,
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
export type GetCategoryInput = TypeOf<typeof getCategorySchema>;
