import Customer, { CustomerCreationAttributes, CustomerUpdate } from '../models/customer.model';
import Order from '../models/order.model';
import { CreateCustomerInput } from '../schema/customer.schema';

export async function createCustomer(input: CustomerCreationAttributes) {
    try {
        const newCustomer = await Customer.create(input);
        return newCustomer;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCustomers(input: string) {
    try {
        const customers = await Customer.findAll({
            where: {
                user_id: input,
            },
        });

        return customers;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getSingleCustomer(user_id: string, customer_id: string) {
    try {
        const customer = await Customer.findOne({
            where: {
                customer_id: customer_id,
                user_id: user_id,
            },
            include: { model: Order },
        });

        return customer;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCustomerAndUpdate(user_id: string, customer_id: string, update: CustomerUpdate) {
    const customer = await Customer.findOne({
        where: { user_id: user_id, customer_id: customer_id },
    });

    if (!customer) {
        return false;
    }

    try {
        await customer.update({ ...update });
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
