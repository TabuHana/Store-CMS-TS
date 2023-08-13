import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';

import {
    createCustomerHandler,
    deleteCustomerHandler,
    getCustomersHandler,
    getSingleCustomerHandler,
    updateCustomerHandler,
} from '../controller/customer.controller';
import {
    createCustomerSchema,
    deleteCustomerSchema,
    getCustomerSchema,
    updateCustomerSchema,
} from '../schema/customer.schema';

function productRoutes(app: Express) {
    /**
     * Item Routes
     */
    app.get('/api/product', requireUser, getCustomersHandler);

    app.get('/api/product/:productId', [requireUser, validateResource(getCustomerSchema)], getSingleCustomerHandler);

    app.post('/api/product', [requireUser, validateResource(createCustomerSchema)], createCustomerHandler);

    app.put('/api/product/:productId', [requireUser, validateResource(updateCustomerSchema)], updateCustomerHandler);

    app.delete('/api/product/:productId', [requireUser, validateResource(deleteCustomerSchema)], deleteCustomerHandler);
}

export default productRoutes;
