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

        console.log(`USER CREATED = ${{ user }}`);

        return res.send(omit(user, 'password'));
    } catch (error: any) {
        if (error.message === 'SequelizeUniqueConstraintError: Validation error') {
            return res.status(409).send({ status: 'Failure', message: 'Email already in use!' });
        } else {
            return res.status(500).send({ status: 'Failure', message: 'Server Error' });
        }
    }
}

/**
 * @description     Get current user
 * @route           GET /api/me
 * @access          Private
 */
export async function getCurrentUserHandler(req: Request, res: Response) {
    const user = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const FullUser = await getUser(user);

    if (!FullUser) {
        return res
            .status(409)
            .send({ status: 'Failure', message: 'Current user is not in the database! Error with server!' });
    }

    return res.send(omit(FullUser, 'password'));
}

/**
 * @description     Update user password
 * @route           PUT /api/user
 * @access          Private
 */
export async function updateUserPasswordHandler(req: Request<{}, {}, UpdateUserInput['body']>, res: Response) {
    const user = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const updatedPassword = await updateUserPassword(user, req.body);

    if (!updateUserPassword) {
        return res.status(409).send({ status: 'Failure' });
    }

    return res.status(200).send(updatedPassword);
}
