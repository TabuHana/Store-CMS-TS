import Order, { OrderCreationAttributes } from '../models/order.model';

export async function createOrder(input: OrderCreationAttributes) {
    try {
        const newOrder = await Order.create(input);
        return newOrder;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getOrders(input: any) {
    try {
        const orders = await Order.findAll({
            where: {
                user_id: input,
            },
        });

        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getSingleOrder(input: any) {
    const { user, order_id } = input;
    try {
        const order = await Order.findOne({
            where: {
                id: order_id,
                user_id: user,
            },
        });

        return order;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getOrderAndUpdate(input: any) {
    const { user, order_id, body } = input;

    const order = await Order.findOne({
        where: { user_id: user, id: order_id },
    });

    if (!order) {
        return false;
    }

    try {
        await order.update(body);
        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteOrder(user_id: string, order_id: string) {
    const order = await Order.findOne({
        where: {
            user_id: user_id,
            id: order_id,
        },
    });

    if (!order) {
        return false;
    }

    order.destroy();

    return true;
}
