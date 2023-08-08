import { Express, Request, Response } from 'express';
import { createUserSchema, updateUserPasswordSchema } from './schema/user.schema';

import validateResource from './middleware/validateResource';
import { createUserHandler, getUserHandler, updateUserPasswordHandler } from './controller/user.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from './controller/session.controller';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.status(200).json({
            status: 'Success',
            message: 'Service is online',
        });
    });

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

    app.get('/api/users', requireUser, getUserHandler);

    app.put('/api/users', requireUser, updateUserPasswordHandler);

    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.delete('/api/users', requireUser);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({
            status: 'Failure',
            message: `Route ${req.originalUrl} does not exist`,
        });
    });
}

export default routes;
