import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema';
import { createUser, findUser, getUser, updateUserPassword } from '../service/user.service';
import { createSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

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

/**
 * @description     Register new user
 * @route           POST /api/user/register
 * @access          Public
 */
export async function registerUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    const email = req.body.email;

    const userExists = await findUser(email);

    if (userExists) {
        return res.status(409).send({ message: 'Email is already in use' });
    }

    const newUser = await createUser(req.body);

    // Create a session
    const session = await createSession(newUser.user_id, req.get('user-agent') || '');

    // Create an access Token
    const accessToken = signJwt(
        { ...newUser, session: session.session_id },
        { expiresIn: config.get<string>('accessTokenTtl') }
    );

    // Create a refresh Token
    const refreshToken = signJwt(
        { ...newUser, session: session.session_id },
        { expiresIn: config.get<string>('refreshTokenTtl') }
    );

    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        sameSite: 'strict',
        secure: false, //set to true for prod
    });

    // Return access & refresh Token
    return res.status(200).send({ user: newUser, accessToken });
}

/**
 * @description     Get current user
 * @route           GET /api/me
 * @access          Private
 */
export async function getRefresh(req: Request, res: Response) {
    try {
        const user = res.locals.user;
        const newToken = res.locals.auth;

        if (!newToken) {
            return res.status(200).send({ message: 'No new Token' });
        }

        return res.status(200).send({ user, newAccessToken: newToken });
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}
