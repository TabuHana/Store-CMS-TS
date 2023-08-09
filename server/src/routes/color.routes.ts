import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';

import {
    createColorHandler,
    deleteColorHandler,
    getColorsHandler,
    getSingleColorHandler,
    updateColorHandler,
} from '../controller/color.controller';
import { createColorSchema, deleteColorSchema, getColorSchema, updateColorSchema } from '../schema/color.schema';

function colorRoutes(app: Express) {
    /**
     * Color Routes
     */
    app.get('/api/color', requireUser, getColorsHandler);

    app.get('/api/color/:colorId', [requireUser, validateResource(getColorSchema)], getSingleColorHandler);

    app.post('/api/color', [requireUser, validateResource(createColorSchema)], createColorHandler);

    app.put('/api/color/:colorId', [requireUser, validateResource(updateColorSchema)], updateColorHandler);

    app.delete('/api/color/:colorId', [requireUser, validateResource(deleteColorSchema)], deleteColorHandler);
}

export default colorRoutes;
