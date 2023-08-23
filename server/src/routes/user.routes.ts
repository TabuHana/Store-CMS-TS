import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createUserHandler, getCurrentUserHandler, updateUserPasswordHandler } from '../controller/user.controller';
import { createUserSchema, updateUserSchema } from '../schema/user.schema';
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionHandler,
} from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';

function userRoutes(app: Express) {
    app.get('/api/me', requireUser, getCurrentUserHandler);

    app.post('/api/user', validateResource(createUserSchema), createUserHandler);

    app.put('/api/user', [requireUser, validateResource(updateUserSchema)], updateUserPasswordHandler);

    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default userRoutes;
