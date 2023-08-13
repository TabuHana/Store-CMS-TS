import Customer, { CustomerCreationAttributes, CustomerUpdate } from '../models/customer.model';
import Order from '../models/order.model';

export async function createCustomer(input: CustomerCreationAttributes) {
    try {
        const newCustomer = await Customer.create(input);
        return newCustomer;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCustomers(input: any) {
    try {
        const customers = await Customer.findAll({
            where: {
                user_id: input,
            },
            include: {
                association: 'orders',
            },
        });

        return customers;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getSingleCustomer(input: any) {
    const { user, customer_id } = input;
    try {
        const customer = await Customer.findOne({
            where: {
                customer_id: customer_id,
                user_id: user,
            },
            include: { model: Order },
        });

        return customer;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCustomerAndUpdate(input: any) {
    const { user, customer_id, body } = input;

    const customer = await Customer.findOne({
        where: { user_id: user, customer_id: customer_id },
    });

    if (!customer) {
        return false;
    }

    try {
        console.log(body);
        await customer.update(body);
        return true;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

export async function deleteCustomer(user_id: string, customer_id: string) {
    const customer = await Customer.findOne({
        where: {
            user_id: user_id,
            customer_id: customer_id,
        },
    });

    if (!customer) {
        return false;
    }

    customer.destroy();

    return true;
}
