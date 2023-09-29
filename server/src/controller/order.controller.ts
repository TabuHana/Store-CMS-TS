import { Request, Response } from 'express';
import { createOrder, deleteOrder, getOrderAndUpdate, getOrders } from '../service/order.service';
import { CreateOrderInput, GetOrderInput, UpdateOrderInput } from '../schema/order.schema';

export async function createOrderHandler(req: Request<{}, {}, CreateOrderInput['body']>, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const body = req.body;

        const order = await createOrder({ ...body, user_id: user });

        return res.send(order);
    } catch (error: any) {
        if (error.message === 'SequelizeUniqueConstraintError: Validation error') {
            return res.status(409).send({ message: 'Email in use' });
        } else {
            return res.status(500).send({ message: `Server Error: ${error.message}` });
        }
    }
}

export async function getOrdersHandler(req: Request, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }
        const orders = await getOrders(user);

        return res.send(orders);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

export async function updateOrderHandler(
    req: Request<UpdateOrderInput['params'], {}, UpdateOrderInput['body']>,
    res: Response
) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const customer_id = req.params.customerId;

        const body = req.body;
        const order = await getOrderAndUpdate({ user, customer_id, body });

        return res.send(order);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

export async function deleteOrderHandler(req: Request<GetOrderInput['params']>, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const customer_id = req.params.customerId;

        await deleteOrder(user, customer_id);

        return res.sendStatus(200);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}