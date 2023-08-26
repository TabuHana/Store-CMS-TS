import axios from 'axios';

const server = `${import.meta.env.VITE_SERVER_ENDPOINT}`

export const getUser = async () => {
    const user = await axios.get(`${server}/api/me`, { withCredentials: true });
    return user.data;
};

export const getCustomers = async () => {
    const customers = await axios.get(`${server}/api/customers`, {
        withCredentials: true,
    });
    return customers.data;
};
