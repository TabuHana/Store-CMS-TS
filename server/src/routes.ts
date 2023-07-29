import { Express, Request, Response } from 'express';
import { createUserSchema } from './schema/user.schema';

import validateResource from './middleware/validateResource';
import { createUserHandler } from './controller/user.controller';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.sendStatus(200);
    });

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
}

export default routes;
