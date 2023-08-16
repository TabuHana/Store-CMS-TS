import { TypeOf, number, object, string } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        description: string({
            required_error: 'Description is required',
        }),
        price: number({
            required_error: 'Price is required',
        }),
        price_per_unit: number({
            required_error: 'Price per unit is required',
        }),
    }),
};

const params = {
    params: object({
        productId: string({
            required_error: 'Product_id is required',
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
