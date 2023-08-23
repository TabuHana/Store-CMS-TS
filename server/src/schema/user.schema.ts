import { TypeOf, object, string } from 'zod';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        password: string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        }).min(6, 'Password too short - must be 6 characters long'),
        passwordConfirmation: string({
            required_error: 'Password Confirmation is required',
            invalid_type_error: 'Password Confirmation must be a string',
        }),
        email: string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        }).email('Not a valid email'),
    })
        .refine((data) => data.password === data.passwordConfirmation, {
            message: 'Passwords do not match',
            path: ['passwordConfirmation'],
        })
        .refine((data) => emailRegex.test(data.email), {
            message: 'Must be a valid email',
            path: ['email'],
        }),
});

export const updateUserSchema = object({
    body: object({
        password: string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        }).min(6, 'Password too short - must be 6 characters long'),
        passwordConfirmation: string({
            required_error: 'Password is required',
            invalid_type_error: 'Password Confirmation must be a string',
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
export type UpdateUserInput = Omit<TypeOf<typeof updateUserSchema>, 'body.passwordConfirmation'>;
