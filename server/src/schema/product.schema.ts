import { TypeOf, object, string, number } from 'zod';


const payload = {
    body: object({
        name: string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        description: string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        }),
        price: number({
            required_error: 'Price is required',
            invalid_type_error: 'Price must be a string',
        }),
        price_per_unit: number({
            required_error: 'Price_per_unit is required',
            invalid_type_error: 'Price_per_unit must be a string',
        }),
    })
};

const params = {
    params: object({
        productId: string({
            required_error: 'Product_id is required',
            invalid_type_error: 'Product_id must be a string',
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

export const getProductSchema = object({
    ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
