import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput, FindUserInput } from '../schema/user.schema';
import { createUser, findUser } from '../service/user.service';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user, 'password'));
    } catch (error: any) {
        if (error.message === 'SequelizeUniqueConstraintError: Validation error') {
            return res.status(409).send({ status: 'Failure', message: 'Email already in use!' });
        } else {
            return res.status(500).send({ status: 'Failure', message: 'Server Error' });
        }
    }
}

export async function getUserHandler(req: Request, res: Response) {
    const user = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const FullUser = await findUser(user);

    if (!FullUser) {
        return res
            .status(409)
            .send({ status: 'Failure', message: 'Current user is not in the database! Error with server!' });
    }

    return res.send(omit(FullUser, 'password'));
}

export async function getUserId(req: Request, res: Response) {
    console.log('get user id');
}

export async function validatePassword(req: Request, res: Response) {
    console.log('validate password');
}
