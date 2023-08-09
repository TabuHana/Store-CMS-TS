import { Request, Response } from 'express';
import { CreateOrderInput, GetOrderInput } from '../schema/order.schema';
import { createOrder, deleteOrder, getOrder, getOrderAndUpdate, getSingleOrder } from '../service/order.service';

export async function createOrderHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const body = req.body;

    const order = await createOrder({ ...body, user_id: user });

    return res.send(order);
}

export async function getOrdersHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const order = await getOrder(user);

    return res.send(order);
}

export async function getSingleOrderHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }


    const order = await getSingleOrder(user);

    return res.send(order);
}

export async function updateOrderHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const order_id = req.params.orderId;

    const { update } = req.body;

    const order = await getOrderAndUpdate(user);

    return res.send(order);
}

export async function deleteOrderHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const order_id = req.params.orderId;

    const order = await deleteOrder(user);

    return res.sendStatus(200).send(order);
}
