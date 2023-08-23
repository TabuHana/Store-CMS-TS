import { Express, Request, Response } from 'express';
import userRoutes from './user.routes';
import customerRoutes from './customer.routes';

function routes(app: Express) {
    /**
     * @description     Healthcheck
     * @route           /
     * @access          Public
     */
    app.get('/', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    /**
     * Metrics section for later
     */
    userRoutes(app);
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
