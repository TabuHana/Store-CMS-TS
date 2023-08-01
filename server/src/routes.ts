import { Express, Request, Response } from 'express';
import { createUserSchema } from './schema/user.schema';

import validateResource from './middleware/validateResource';
import { createUserHandler } from './controller/user.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';
import { createUserSessionHandler } from './controller/session.controller';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.status(200).json({
            status: 'success',
            message: 'Service is online',
        });
    });

    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({
            status: 'fail',
            message: `Route ${req.originalUrl} does not exist`,
        });
    });

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

    // app.get('/api/sessions', requireUser, getUserSessionHandler);
}

export default routes;
