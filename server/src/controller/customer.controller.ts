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
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const body = req.body;

    const customer = await createCustomer({ ...body, user_id: user });

    return res.send(customer);
}

export async function getCustomersHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const customers = await getCustomers(user);

    return res.send(customers);
}

export async function getSingleCustomerHandler(req: Request<GetCustomerInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const customer_id = req.params.customerId;

    const customer = await getSingleCustomer({ user, customer_id });

    return res.send(customer);
}

export async function updateCustomerHandler(
    req: Request<GetCustomerInput['params'], {}, UpdateCustomerInput['body']>,
    res: Response
) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const customer_id = req.params.customerId;

    const body = req.body;

    const customer = await getCustomerAndUpdate({ user, customer_id, body });

    return res.send(customer);
}

export async function deleteCustomerHandler(req: Request<GetCustomerInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const customer_id = req.params.customerId;

    await deleteCustomer(user, customer_id);

    return res.sendStatus(200);
}
