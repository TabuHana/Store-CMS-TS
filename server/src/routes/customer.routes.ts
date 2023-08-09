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

function customerRoutes(app: Express) {
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
}

export default customerRoutes;
