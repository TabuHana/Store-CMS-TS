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
export const updateUserSchema = object({
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
});

/**
 * User Types
 */
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
export type UpdateUserInput = Omit<TypeOf<typeof updateUserSchema>, 'body.passwordConfirmation'>;
