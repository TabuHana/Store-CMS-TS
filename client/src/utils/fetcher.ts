import axios from 'axios';

// export const fetcher = <T>(url: string): Promise<T> =>
//     axios.get<T>(url, { withCredentials: true }).then((res) => res.data);

export const getUser = async () => {
    const user = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/me`, { withCredentials: true });
    return user.data
};
