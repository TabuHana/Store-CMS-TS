import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
    createStockHandler,
    deleteStockHandler,
    getSingleStockHandler,
    getStocksHandler,
    updateStockHandler,
} from '../controller/stock.controller';
import { createStockSchema, deleteStockSchema, getStockSchema, updateStockSchema } from '../schema/stock.schema';

function stockRoutes(app: Express) {
    /**
     * Stock Routes
     */
    app.get('/api/stock', requireUser, getStocksHandler);

    app.get('/api/stock/:stockId', [requireUser, validateResource(getStockSchema)], getSingleStockHandler);

    app.post('/api/stock', [requireUser, validateResource(createStockSchema)], createStockHandler);

    app.put('/api/stock/:stockId', [requireUser, validateResource(updateStockSchema)], updateStockHandler);

    app.delete('/api/stock/:stockId', [requireUser, validateResource(deleteStockSchema)], deleteStockHandler);
}

export default stockRoutes;
