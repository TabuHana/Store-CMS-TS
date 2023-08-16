import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import { get } from 'lodash';

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    // Validate the user's password
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    // Create a session
    const session = await createSession(user.user_id, req.get('user-agent') || '');

    // Create an access Token
    const accessToken = signJwt({ ...user, session: session.session_id }, { expiresIn: config.get('accessTokenTtl') });

    // Create a refresh Token
    const refreshToken = signJwt(
        { ...user, session: session.session_id },
        { expiresIn: config.get('refreshTokenTtl') }
    );

    res.cookie('accessToken', accessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false //set to true for prod
    })

    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false //set to true for prod
    })

    // Return access & refresh Token
    return res.status(200).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user.user_id;

    const sessions = await findSessions(userId);

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const session: number = res.locals.user.session;

    console.log('-----------------controller')
    console.log(session)

    await updateSession({ session_id: session }, { valid: false });

    const accessToken = get(req, 'cookies.accessToken') || get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    const refreshToken = get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh') as string;

    res.cookie('accessToken', accessToken, {
        maxAge: 1, // 1 millisecond
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false //set to true for prod
    })

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1, // 1 millisecond
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false //set to true for prod
    })

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}
