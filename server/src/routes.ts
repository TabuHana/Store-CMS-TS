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

    app.delete('/api/items/:itemId', [requireUser, validateResource(deleteCustomerSchema)], deleteCustomerHandler);

    /**
     * Order Routes
     */
    app.get('/api/orders', requireUser, getOrdersHandler);

    app.get('/api/items/:orderId', [requireUser, validateResource(getOrderSchema)], getSingleOrderHandler);

    app.post('/api/orders', [requireUser, validateResource(createOrderSchema)], createOrderHandler);

    app.put('/api/items/:orderId', [requireUser, validateResource(updateOrderrSchema)], updateOrderHandler);

    app.delete('/api/items/:orderId', [requireUser, validateResource(deleteOrderSchema)], deleteOrderHandler);

    /**
     * Stock Routes
     */
    app.get('/api/stock', requireUser, getStockHandler);

    app.get('/api/stock/:stockId', [requireUser, validateResource(getStockSchema)], getSingleStockHandler);

    app.post('/api/stock', [requireUser, validateResource(createStockSchema)], createStockHandler);

    app.put('/api/stock/:stockId', [requireUser, validateResource(updateStockSchema)], updateStockHandler);

    app.delete('/api/stock/:stockId', [requireUser, validateResource(deleteStockSchema)], deleteStockHandler);

    /**
     * Color Routes
     */
    app.get('/api/color', requireUser, getColorHandler);

    app.get('/api/color/:colorId', [requireUser, validateResource(getColorSchema)], getSingleColorHandler);

    app.post('/api/color', [requireUser, validateResource(createColorSchema)], createColorHandler);

    app.put('/api/color/:colorId', [requireUser, validateResource(updateColorSchema)], updateColorHandler);

    app.delete('/api/color/:colorId', [requireUser, validateResource(deleteColorSchema)], deleteColorHandler);

    /**
     * Category Routes
     */
    app.get('/api/category', requireUser, getCategoryHandler);

    app.get('/api/category/:categoryId', [requireUser, validateResource(getCategorySchema)], getSingleCategoryHandler);

    app.post('/apicategory', [requireUser, validateResource(createCategorySchema)], createCategoryHandler);

    app.put('/api/category/:categoryId', [requireUser, validateResource(updateCategorySchema)], updateCategoryHandler);

    app.delete(
        '/api/category/:categoryId',
        [requireUser, validateResource(deleteCategorySchema)],
        deleteCategoryHandler
    );

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
