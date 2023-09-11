import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser, findUser, validatePassword } from '../service/user.service';
import { createSession, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

/**
 * @description     Register new user
 * @route           POST /api/auth/register
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
    return res.status(200).send({ accessToken });
}

/**
 * @description     Login user
 * @route           POST /api/auth/login
 * @access          Public
 */
export async function loginUserHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    // Validate the user's password
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    // Create a session
    const session = await createSession(user.user_id, req.get('user-agent') || '');

    // Create an access Token
    const accessToken = signJwt(
        { ...user, session: session.session_id },
        { expiresIn: config.get<string>('accessTokenTtl') }
    );

    // Create a refresh Token
    const refreshToken = signJwt(
        { ...user, session: session.session_id },
        { expiresIn: config.get<string>('refreshTokenTtl') }
    );

    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        sameSite: 'strict',
        secure: false, //set to true for prod
    });

    // Return access & refresh Token
    return res.status(200).send({ accessToken });
}

/**
 * @description     Logout user
 * @route           POST /api/auth/logout
 * @access          Public
 */
export async function logoutUserHandler(req: Request, res: Response) {
    try {
        const session: number = res.locals.user.session;

        await updateSession({ session_id: session }, { valid: false });

        res.clearCookie('refreshToken');

        return res.status(200).send({ accessToken: null });
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}

/**
 * @description     Get new accessToken
 * @route           GET /api/auth/refresh
 * @access          Private
 */
export async function handleRefreshToken(req: Request, res: Response) {
    try {
        const newAccessToken = res.getHeader('x-access-token');

        if (!newAccessToken) {
            console.log('no new access token sent. refresh token doesnt exist. Forbiddden. @auth.controller.ts');
            return res.sendStatus(401);
        }

        return res.status(200).send({ accessToken: newAccessToken });
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}
