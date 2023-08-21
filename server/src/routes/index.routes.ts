import { Express, Request, Response } from 'express';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import customerRoutes from './customer.routes';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        console.log('SERVER HEALTH CHECKED');
        res.status(200).json({
            status: 'Success',
            message: 'Service is online',
        });
    });

    /**
     * Metrics section for later
     */
    userRoutes(app);
    /**
     * Metrics section for later
     */
    sessionRoutes(app);
    /**
     * Metrics section for later
     */
    customerRoutes(app);
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
