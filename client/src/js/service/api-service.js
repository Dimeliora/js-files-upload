import { BASE_URL } from '../constants/constants';

export const userAuth = async () => {
    const accessToken = localStorage.getItem('access-token');

    const response = await fetch(`${BASE_URL}/auth`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }

    return response.json();
};

export const userLogin = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }

    return response.json();
};

export const userRegister = async (username, email, password) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }

    return response.json();
};
