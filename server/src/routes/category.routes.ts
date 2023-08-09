import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
    createCategoryHandler,
    deleteCategoryHandler,
    getCategorysHandler,
    getSingleCategoryHandler,
    updateCategoryHandler,
} from '../controller/category.controller';
import {
    createCategorySchema,
    deleteCategorySchema,
    getCategorySchema,
    updateCategorySchema,
} from '../schema/category.schema';

function categoryRoutes(app: Express) {
    /**
     * Category Routes
     */
    app.get('/api/category', requireUser, getCategorysHandler);

    app.get('/api/category/:categoryId', [requireUser, validateResource(getCategorySchema)], getSingleCategoryHandler);

    app.post('/apicategory', [requireUser, validateResource(createCategorySchema)], createCategoryHandler);

    app.put('/api/category/:categoryId', [requireUser, validateResource(updateCategorySchema)], updateCategoryHandler);

    app.delete(
        '/api/category/:categoryId',
        [requireUser, validateResource(deleteCategorySchema)],
        deleteCategoryHandler
    );
}

export default categoryRoutes;
