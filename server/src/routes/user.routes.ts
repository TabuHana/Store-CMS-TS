import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import { createUserHandler, getCurrentUserHandler, updateUserPasswordHandler } from '../controller/user.controller';
import { createUserSchema, updateUserSchema } from '../schema/user.schema';
import validateResource from '../middleware/validateResource';

function userRoutes(app: Express) {
    app.get('/api/me', requireUser, getCurrentUserHandler);

    app.post('/api/user', validateResource(createUserSchema), createUserHandler);

    app.put('/api/user', [requireUser, validateResource(updateUserSchema)], updateUserPasswordHandler);
}

export default userRoutes;
