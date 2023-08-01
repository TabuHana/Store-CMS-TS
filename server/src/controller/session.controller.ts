import { Request, Response } from 'express';
import { findUser, validatePassword } from '../service/user.service';
import { createSession, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionHandler(res: Response, req: Request) {
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

    // Return access & refresh Token
    return res.status(400).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(res: Response, req: Request) {
    console.log('get user session');
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session_id;

    await updateSession({ session_id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}
