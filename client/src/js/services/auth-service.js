import axios from 'axios';

import { BASE_URL } from '../config/base-url';

const authService = axios.create({
    baseURL: `${BASE_URL}/auth`,
});

export const userAuth = async () => {
    const accessToken = localStorage.getItem('access-token');

    try {
        const { data } = await authService.get('/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const userLogin = async (email, password) => {
    try {
        const { data } = await authService.post('/login', {
            email,
            password,
        });

        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const userRegister = async (username, email, password) => {
    try {
        const { data } = await authService.post('/register', {
            username,
            email,
            password,
        });

        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
