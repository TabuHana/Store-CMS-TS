import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
    createCustomerHandler,
    deleteCustomerHandler,
    getCustomersHandler,
    updateCustomerHandler,
} from '../controller/customer.controller';
import {
    createCustomerSchema,
    getCustomerSchema,
    updateCustomerSchema,
} from '../schema/customer.schema';

function customerRoutes(app: Express) {
    app.get('/api/customers', requireUser, getCustomersHandler);

    app.post('/api/customers', [requireUser, validateResource(createCustomerSchema)], createCustomerHandler);

    app.put('/api/customers/:customerId', [requireUser, validateResource(updateCustomerSchema)], updateCustomerHandler);

    app.delete(
        '/api/customers/:customerId',
        [requireUser, validateResource(getCustomerSchema)],
        deleteCustomerHandler
    );
}

export default customerRoutes;
