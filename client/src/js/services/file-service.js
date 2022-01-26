import axios from 'axios';

import { BASE_URL } from '../config/base-url';

const fileService = axios.create({
    baseURL: `${BASE_URL}/file`,
});

const fileUploadAbilityCheck = (fileData) => {
    const accessToken = localStorage.getItem('access-token');

    return fileService.post('/upload/check', fileData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const fileUpload = async (file) => {
    const accessToken = localStorage.getItem('access-token');

    try {
        await fileUploadAbilityCheck({ filename: file.name, size: file.size });

        const formData = new FormData();
        formData.append('file', file);

        const { data } = await fileService.post('/upload', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            onUploadProgress: (e) => {
                let totalLength;
                if (e.lengthComputable) {
                    totalLength = e.total;
                } else {
                    totalLength =
                        e.target.getResponseHeader('content-length') ||
                        e.target.getResponseHeader(
                            'x-decompressed-content-length'
                        );
                }

                const uploadProgress = Math.round(
                    (e.loaded / totalLength) * 100
                );
                console.log(file.name, uploadProgress);
            },
        });

        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
