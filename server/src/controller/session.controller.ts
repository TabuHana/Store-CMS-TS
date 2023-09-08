import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
    try {
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

        res.cookie('accessToken', accessToken, {
            maxAge: 900000, // 15 mins
            httpOnly: true,
            sameSite: 'strict',
            secure: false, //set to true for prod
        });

        res.cookie('refreshToken', refreshToken, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            sameSite: 'strict',
            secure: false, //set to true for prod
        });
        // Return access & refresh Token
        return res.status(200).send({ accessToken, refreshToken });
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}

export async function getUserSessionHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.user_id;

        const sessions = await findSessions(userId);

        return res.send(sessions);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}

export async function deleteSessionHandler(req: Request, res: Response) {
    try {
        const session: number = res.locals.user.session;

        await updateSession({ session_id: session }, { valid: false });

        res.clearCookie('refreshToken')

        return res.send({
            user: null,
            accessToken: null,
        });
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error: ${error.message}` });
    }
}

/**
 * @description     Login user password
 * @route           POST /api/user/login
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
        return res.status(200).send({ user, accessToken });
}
