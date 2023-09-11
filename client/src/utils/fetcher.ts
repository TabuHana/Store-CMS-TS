import axios from "../api/axios";

export async function getUser() {
    const user = await axios.get('/api/user/me', { withCredentials: true });

    return user.data;
}
