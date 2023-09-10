import { Express, Router } from 'express';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
    createUserHandler,
    getCurrentUserHandler,
    getRefresh,
    registerUserHandler,
    updateUserPasswordHandler,
} from '../controller/user.controller';
import { createUserSchema, updateUserSchema } from '../schema/user.schema';
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionHandler,
    loginUserHandler,
} from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';

const router = Router();

router.get('/me', getCurrentUserHandler);

router.post('/register', validateResource(createUserSchema), registerUserHandler);

export default router;

// function userRoutes(app: Express) {
//     app.get('/api/me', requireUser, getCurrentUserHandler);

//     app.post('/api/user/register', validateResource(createUserSchema), registerUserHandler);

//     app.post('/api/user/login', validateResource(createSessionSchema), loginUserHandler);

// app.get('/api/sessions', requireUser, getUserSessionHandler);

// app.post('/api/user', validateResource(createUserSchema), createUserHandler);

// app.put('/api/user', [requireUser, validateResource(updateUserSchema)], updateUserPasswordHandler);

// app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

// app.delete('/api/sessions', requireUser, deleteSessionHandler);

// app.get('/api/user/refresh', getRefresh);
// }

// export default userRoutes;
