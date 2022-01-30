import axios from 'axios';

import { BASE_URL } from '../config/base-url';

const userService = axios.create({
    baseURL: `${BASE_URL}/user`,
});

export const getUserData = async () => {
    const accessToken = localStorage.getItem('access-token');

    try {
        const { data } = await userService.get('/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return data;
    } catch (error) {
        if (!error.response) {
            throw new Error('Service is unreachable');
        }

        throw new Error(error.response.data.message);
    }
};

export const uploadUserAvatarImage = async (imageFile) => {
    const accessToken = localStorage.getItem('access-token');

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
        const { data } = await userService.post('/avatar', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return data;
    } catch (error) {
        if (!error.response) {
            throw new Error('Service is unreachable');
        }

        throw new Error(error.response.data.message);
    }
};
