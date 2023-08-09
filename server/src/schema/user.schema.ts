import { TypeOf, object, string } from 'zod';

/**
 * Creating a User Schema
 */
export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password too short - must be 6 characters long'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

/**
 * User Payload
 * This payload is only used for changing the user password
 */
const payload = {
    body: object({
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password too short - must be 6 characters long'),
        passwordConfirmation: string({
            required_error: 'Password is required',
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
};

/**
 * User Requested Params
 * Used for needed user id
 */
const params = {
    params: object({
        user_id: string({
            required_error: 'User_id is required',
        }),
    }),
};

/**
 * Find User Schema
 */
export const findUserSchema = object({
    ...params,
});

/**
 * Update User password Schema
 */
export const updateUserSchema = object({
    ...payload,
});

/**
 * User Types
 */
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
export type FindUserInput = TypeOf<typeof findUserSchema>;
export type UpdateUserInput = Omit<TypeOf<typeof updateUserSchema>, 'body.passwordConfirmation'>;
