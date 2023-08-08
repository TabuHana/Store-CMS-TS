import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

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

    // Return access & refresh Token
    return res.status(400).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user.user_id;

    const sessions = await findSessions(userId);

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const session: number = res.locals.user.session;

    await updateSession({ session_id: session }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}
