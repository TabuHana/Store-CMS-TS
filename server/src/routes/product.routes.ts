import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
    createProductHandler,
    deleteProductHandler,
    getProductsHandler,
    getSingleProductHandler,
    updateProductHandler,
} from '../controller/product.controller';
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from '../schema/product.schema';

function productRoutes(app: Express) {
    /**
     * Item Routes
     */
    app.get('/api/products', requireUser, getProductsHandler);

    app.get('/api/products/:productId', [requireUser, validateResource(getProductSchema)], getSingleProductHandler);

    app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler);

    app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler);

    app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler);
}

export default productRoutes;
