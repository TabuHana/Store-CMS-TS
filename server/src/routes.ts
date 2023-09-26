import { Express, Request, Response } from 'express';
import validate from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import {
    handleRefreshToken,
    loginUserHandler,
    logoutUserHandler,
    registerUserHandler,
} from './controller/auth.controller';
import { getCurrentUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import {
    createCustomerHandler,
    deleteCustomerHandler,
    getCustomersHandler,
    updateCustomerHandler,
} from './controller/customer.controller';
import { createCustomerSchema, getCustomerSchema, updateCustomerSchema } from './schema/customer.schema';
import { createProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';
import {
    createProductHandler,
    deleteProductHandler,
    getProductsHandler,
    updateProductHandler,
} from './controller/product.controller';

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

    // Customer Routes
    app.post('/api/customers', [requireUser, validate(createCustomerSchema)], createCustomerHandler);
    app.get('/api/customers', requireUser, getCustomersHandler);
    app.put('/api/customers/:customerId', [requireUser, validate(updateCustomerSchema)], updateCustomerHandler);
    app.delete('/api/customers/:customerId', [requireUser, validate(getCustomerSchema)], deleteCustomerHandler);

    // Product Routes
    app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);
    app.get('/api/products', requireUser, getProductsHandler);
    app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);
    app.delete('/api/products/:productId', [requireUser, validate(getProductSchema)], deleteProductHandler);

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
