import axios from "../api/axios";

export async function getUser() {
    const user = await axios.get('/api/user/me', { withCredentials: true });

    return user.data;
}

export async function getCustomers() {
    const customers = await axios.get('/api/customers')

    return customers.data
}

export async function getOrders() {
    const orders = await axios.get('https://jsonplaceholder.typicode.com/users')

    return orders.data
}

export async function getProducts() {
    const products = await axios.get('https://jsonplaceholder.typicode.com/users')

    return products.data
}
