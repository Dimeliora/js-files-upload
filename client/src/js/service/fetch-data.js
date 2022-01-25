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
