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

function itemRoutes(app: Express) {
    /**
     * Item Routes
     */
    app.get('/api/items', requireUser, getCustomersHandler);

    app.get('/api/items/:itemId', [requireUser, validateResource(getCustomerSchema)], getSingleCustomerHandler);

    app.post('/api/items', [requireUser, validateResource(createCustomerSchema)], createCustomerHandler);

    app.put('/api/items/:itemId', [requireUser, validateResource(updateCustomerSchema)], updateCustomerHandler);

    app.delete('/api/items/:itemId', [requireUser, validateResource(deleteCustomerSchema)], deleteCustomerHandler);
}

export default itemRoutes;
