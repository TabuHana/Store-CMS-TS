import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
    createCategoryHandler,
    deleteCategoryHandler,
    getCategorysHandler,
    updateCategoryNameHandler,
} from '../controller/category.controller';
import { createCategorySchema, deleteCategorySchema, updateCategorySchema } from '../schema/category.schema';

function categoryRoutes(app: Express) {
    /**
     * Category Routes
     */
    app.get('/api/category', requireUser, getCategorysHandler);

    app.post('/api/category', [requireUser, validateResource(createCategorySchema)], createCategoryHandler);

    app.put(
        '/api/category/:categoryId',
        [requireUser, validateResource(updateCategorySchema)],
        updateCategoryNameHandler
    );

    app.get('/api/category/temp', requireUser, updateCategoryNameHandler);

    app.delete(
        '/api/category/:categoryId',
        [requireUser, validateResource(deleteCategorySchema)],
        deleteCategoryHandler
    );
}

export default categoryRoutes;
