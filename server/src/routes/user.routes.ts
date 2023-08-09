import { Express } from 'express';
import requireUser from '../middleware/requireUser';
import { createUserHandler, getUserHandler, updateUserPasswordHandler } from '../controller/user.controller';
import { createUserSchema, updateUserPasswordSchema } from '../schema/user.schema';
import validateResource from '../middleware/validateResource';

function userRoutes(app: Express) {
    app.get('/api/users', requireUser, getUserHandler);

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    app.put('/api/users', [requireUser, validateResource(updateUserPasswordSchema)], updateUserPasswordHandler);
}

export default userRoutes;
