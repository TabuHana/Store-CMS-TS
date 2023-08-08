import { Express, Request, Response } from 'express';
import { createUserSchema, updateUserPasswordSchema } from './schema/user.schema';

import validateResource from './middleware/validateResource';
import { createUserHandler, getUserHandler, updateUserPasswordHandler } from './controller/user.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from './controller/session.controller';
import {
    createCustomerSchema,
    deleteCustomerSchema,
    getCustomerSchema,
    updateCustomerSchema,
} from './schema/customer.schema';
import {
    createCustomerHandler,
    deleteCustomerHandler,
    getCustomersHandler,
    getSingleCustomerHandler,
    updateCustomerHandler,
} from './controller/customer.controller';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.status(200).json({
            status: 'Success',
            message: 'Service is online',
        });
    });

    /**
     * User Routes
     */
    app.get('/api/users', requireUser, getUserHandler);

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    app.put('/api/users', [requireUser, validateResource(updateUserPasswordSchema)], updateUserPasswordHandler);

    // app.delete('/api/users', requireUser);

    /**
     * Session Routes
     */
    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    /**
     * Customer Routes
     */

    app.get('/api/customers', requireUser, getCustomersHandler);

    app.get('/api/customers/:customerId', [requireUser, validateResource(getCustomerSchema)], getSingleCustomerHandler);

    app.post('/api/customers', [requireUser, validateResource(createCustomerSchema)], createCustomerHandler);

    app.put('/api/customers/:customerId', [requireUser, validateResource(updateCustomerSchema)], updateCustomerHandler);

    app.delete(
        '/api/customers/:customerId',
        [requireUser, validateResource(deleteCustomerSchema)],
        deleteCustomerHandler
    );

    /**
     * Item Routes
     */

    app.get('/api/items', requireUser, getCustomersHandler);

    app.get('/api/items/:itemId', [requireUser, validateResource(getCustomerSchema)], getSingleCustomerHandler);

    app.post('/api/items', [requireUser, validateResource(createCustomerSchema)], createCustomerHandler);

    app.put('/api/items/:itemId', [requireUser, validateResource(updateCustomerSchema)], updateCustomerHandler);

    app.delete(
        '/api/items/:itemId',
        [requireUser, validateResource(deleteCustomerSchema)],
        deleteCustomerHandler
    );

    /**
     * Order Routes
     */

    /**
     * Stock Routes
     */

    /**
     * Color Routes
     */

    /**
     * Category Routes
     */

    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({
            status: 'Failure',
            message: `Route ${req.originalUrl} does not exist`,
        });
    });
}

export default routes;
