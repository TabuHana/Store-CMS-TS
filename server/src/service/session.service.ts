import { get } from 'lodash';
import Session from '../models/session.model';
import { filterSessionQuery } from '../schema/session.schema';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';
import config from 'config';

export async function createSession(id: string, userAgent: string) {
    const session = await Session.create({
        user_id: id,
        userAgent,
    });

    return session.toJSON();
}

export async function findSessions(query: filterSessionQuery) {
    const session = await Session.findAll({ where: { user_id: query, valid: true } });

    return session;
}

export async function updateSession(query: any, update: any) {
    try {
        return Session.update(update, {
            where: query,
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await Session.findByPk(get(decoded, 'session'));

    if (!session || !session.valid) return false;

    const user = await findUser(session.user_id);

    if (!user) return false;

    const accessToken = signJwt({ ...user, session: session.session_id }, { expiresIn: config.get('accessTokenTtl') });

    return accessToken;
}
