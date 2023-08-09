import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';

import {
    createOrderHandler,
    deleteOrderHandler,
    getOrdersHandler,
    getSingleOrderHandler,
    updateOrderHandler,
} from '../controller/order.controller';
import { createOrderSchema, deleteOrderSchema, getOrderSchema, updateOrderSchema } from '../schema/order.schema';

function orderRoutes(app: Express) {
    /**
     * Order Routes
     */
    app.get('/api/orders', requireUser, getOrdersHandler);

    app.get('/api/items/:orderId', [requireUser, validateResource(getOrderSchema)], getSingleOrderHandler);

    app.post('/api/orders', [requireUser, validateResource(createOrderSchema)], createOrderHandler);

    app.put('/api/items/:orderId', [requireUser, validateResource(updateOrderSchema)], updateOrderHandler);

    app.delete('/api/items/:orderId', [requireUser, validateResource(deleteOrderSchema)], deleteOrderHandler);
}

export default orderRoutes;
