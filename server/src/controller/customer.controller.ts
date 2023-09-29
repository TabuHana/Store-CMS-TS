import { Request, Response } from 'express';
import {
    createCustomer,
    deleteCustomer,
    getCustomerAndUpdate,
    getCustomers,
    getSingleCustomer,
} from '../service/customer.service';
import { CreateCustomerInput, GetCustomerInput, UpdateCustomerInput } from '../schema/customer.schema';

export async function createCustomerHandler(req: Request<{}, {}, CreateCustomerInput['body']>, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const body = req.body;

        const customer = await createCustomer({ ...body, user_id: user });

        return res.send(customer);
    } catch (error: any) {
        if (error.message === 'SequelizeUniqueConstraintError: Validation error') {
            return res.status(409).send({ message: 'Email in use' });
        } else {
            return res.status(500).send({ message: `Server Error: ${error.message}` });
        }
    }
}

export async function getCustomersHandler(req: Request, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }
        const customers = await getCustomers(user);

        return res.send(customers);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

export async function getSingleCustomerHandler(req: Request<GetCustomerInput['params']>, res: Response) {
    try {
        const user: string = res.locals.user.user_id;
        const customer_id: string = req.params.customerId;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        if (!customer_id) {
            return res.status(400).send({ message: 'Customer_id is Required' });
        }
        const customer = await getSingleCustomer(user, customer_id);

        return res.send(customer);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

export async function updateCustomerHandler(
    req: Request<UpdateCustomerInput['params'], {}, UpdateCustomerInput['body']>,
    res: Response
) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const customer_id = req.params.customerId;

        const body = req.body;
        const customer = await getCustomerAndUpdate({ user, customer_id, body });

        return res.send(customer);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

export async function deleteCustomerHandler(req: Request<GetCustomerInput['params']>, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const customer_id = req.params.customerId;

        await deleteCustomer(user, customer_id);

        return res.sendStatus(200);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}
