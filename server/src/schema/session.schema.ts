import { TypeOf, object, string } from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string'
        }),
        password: string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string'
        }),
    }),
});

export const filterSessionSchema = object({
    body: object({
        user_id: string({
            required_error: 'User_id is required',
        }),
    }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
export type filterSessionQuery = TypeOf<typeof filterSessionSchema>;
