import { Request, Response } from 'express';
import { omit } from 'lodash';
import logger from '../utils/logger';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import User from '../models/user.model';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user, 'password'));
    } catch (error: any) {
        if (error === 'Sequelize') {
            return res.status(409).send({ status: 'fail', message: 'Email already in use!' });
        } else {
            return res.status(500).send({ status: 'fail', message: 'Server Error' });
        }
    }
}

export async function getUserHandler(req: Request, res: Response) {
    console.log('get user');
}

export async function getUserId(req: Request, res: Response) {
    console.log('get user id');
}

export async function validatePassword(req: Request, res: Response) {
    console.log('validate password');
}
