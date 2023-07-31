import { Request, Response } from 'express';
import { omit } from 'lodash';
import logger from '../utils/logger';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: omit(user, 'password'),
            },
        });
    } catch (error: any) {
        logger.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({
                status: 'failed',
                message: 'User already exists with that email',
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}
