import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
    console.log('========= CREATE SESSION ==========');
    const user = await validatePassword(req.body);

    // Validate the user's password
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    console.log(`USER = ${user}`);

    // Create a session
    const session = await createSession(user.user_id, req.get('user-agent') || '');

    console.log(`SESSION = ${session}`);

    console.log(`token ttl = ${config.get<string>('accessTokenTtl')}`);
    console.log(`token type = ${typeof config.get<string>('accessTokenTtl')}`);

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

    console.log('accessTK', accessToken);
    console.log('refreshTK', refreshToken);

    res.cookie('accessToken', accessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: config.get('origin'),
        path: '/',
        sameSite: 'strict',
        secure: true, //set to true for prod
    });

    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: config.get('origin'),
        path: '/',
        sameSite: 'strict',
        secure: true, //set to true for prod
    });

    console.log('Cookies should be set now');
    // Return access & refresh Token
    return res.status(200).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user.user_id;

    const sessions = await findSessions(userId);

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    console.log('delete called');
    const session: number = res.locals.user.session;

    await updateSession({ session_id: session }, { valid: false });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}
