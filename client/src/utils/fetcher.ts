import axios from 'axios';

// type Customer = {
//     id: number
//     name: string;
//     phone: string;
//     email: string;
//     address: string;
// };

// export const fetcher = <T>(url: string): Promise<T> =>
//     axios.get<T>(url, { withCredentials: true }).then((res) => res.data);

export const getUser = async () => {
    const user = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/me`, { withCredentials: true });
    return user.data;
};

export const getCustomers = async () => {
    const customers = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/customers`, {
        withCredentials: true,
    });
    return customers.data;
};
