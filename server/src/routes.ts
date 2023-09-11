import { Express, Request, Response } from 'express';
import validate from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { handleRefreshToken, loginUserHandler, logoutUserHandler, registerUserHandler } from './controller/auth.controller';
import { getCurrentUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import { getUserSessionHandler } from './controller/session.controller';

function routes(app: Express) {
    /**
     * @description     Healthcheck
     * @route           /
     * @access          Public
     */
    app.get('/', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post('/api/auth/register', validate(createUserSchema), registerUserHandler);
    app.post('/api/auth/login', validate(createSessionSchema), loginUserHandler);
    app.get('/api/auth/refresh', handleRefreshToken);
    app.delete('/api/auth/logout', requireUser, logoutUserHandler);

    // User Routes

    app.get('/api/user/me', requireUser, getCurrentUserHandler);
    app.get('/api/session/me', requireUser, getUserSessionHandler)

    /**
     * Metrics section for later
     */
    /**
     * Catch-all Route
     */
    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({
            status: 'Failure',
            message: `Route ${req.originalUrl} does not exist`,
        });
    });
}
export default routes;
