import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

// This is called curring.
// It passes the schema in the middleware and then validates requests off the schema

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
    } catch (error: any) {
        return res.status(400).send(error.errors);
    }
};

export default validate;
