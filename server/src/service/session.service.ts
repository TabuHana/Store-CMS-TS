import Session from '../models/session.model';
import { filterSessionQuery } from '../schema/session.schema';

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({
        user_id: userId,
        userAgent,
    });

    return session.toJSON();
}

export async function findSessions(query: filterSessionQuery) {
    return Session.findAll({ where: { user_id: query } });
}
