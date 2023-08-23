import { Request, Response } from 'express';
import { createCustomer, deleteCustomer, getCustomerAndUpdate, getCustomers } from '../service/customer.service';
import { CreateCustomerInput, GetCustomerInput, UpdateCustomerInput } from '../schema/customer.schema';

export async function createCustomerHandler(req: Request<{}, {}, CreateCustomerInput['body']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ message: 'Login Required' });
    }

    const body = req.body;

    try {
        const customer = await createCustomer({ ...body, user_id: user });

        return res.send(customer);
    } catch (error: any) {
        if (error.message === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).send({ message: 'User does not exist' });
        } else {
            return res.status(500).send({ message: 'Server Error' });
        }
    }
}

export async function getCustomersHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ message: 'Login Required' });
    }

    const customers = await getCustomers(user);

    return res.send(customers);
}

export async function updateCustomerHandler(
    req: Request<GetCustomerInput['params'], {}, UpdateCustomerInput['body']>,
    res: Response
) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ message: 'Login Required' });
    }

    const customer_id = req.params.customerId;

    const body = req.body;

    const customer = await getCustomerAndUpdate({ user, customer_id, body });

    return res.send(customer);
}

export async function deleteCustomerHandler(req: Request<GetCustomerInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ message: 'Login Required' });
    }

    const customer_id = req.params.customerId;

    await deleteCustomer(user, customer_id);

    return res.sendStatus(200);
}
