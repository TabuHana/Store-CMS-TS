import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionHandler,
} from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';

function sessionRoutes(app: Express) {
    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default sessionRoutes;
