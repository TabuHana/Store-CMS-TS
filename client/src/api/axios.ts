import axios from 'axios';

export const server = import.meta.env.VITE_SERVER_ENDPOINT;

export default axios.create({
    baseURL: server,
});

export const axiosPrivate = axios.create({
    baseURL: server,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
