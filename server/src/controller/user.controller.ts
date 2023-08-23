import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema';
import { createUser, getUser, updateUserPassword } from '../service/user.service';

/**
 * @description     Create a user
 * @route           POST /api/user
 * @access          Public
 */
export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);

        return res.status(201).send(omit(user, 'password'));
    } catch (error: any) {
        if (error.message === 'SequelizeUniqueConstraintError: Validation error') {
            return res.status(409).send({ message: 'Email in use' });
        } else {
            return res.status(500).send({ message: 'Server Error' });
        }
    }
}

/**
 * @description     Get current user
 * @route           GET /api/me
 * @access          Private
 */
export async function getCurrentUserHandler(req: Request, res: Response) {
    try {
        const user = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const FullUser = await getUser(user);

        if (!FullUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send(omit(FullUser, 'password'));
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}

/**
 * @description     Update user password
 * @route           PUT /api/user
 * @access          Private
 */
export async function updateUserPasswordHandler(req: Request<{}, {}, UpdateUserInput['body']>, res: Response) {
    try {
        const user = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const updatedPassword = await updateUserPassword(user, req.body);

        if (!updateUserPassword) {
            return res.status(409).send({ message: 'Failed to update password' });
        }

        return res.status(200).send(updatedPassword);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}
