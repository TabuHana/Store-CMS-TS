import { TypeOf, object, string } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: 'Email is required',
        }),
    }),
};

const params = {
    params: object({
        categoryId: string({
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


export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
