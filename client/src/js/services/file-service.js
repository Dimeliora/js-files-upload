import axios from 'axios';

import CancelError from '../errors/cancel-error';
import { ee } from '../helpers/event-emitter';
import { BASE_URL } from '../config/base-url';

const fileService = axios.create({
    baseURL: `${BASE_URL}/file`,
});

export const fileUpload = async (file) => {
    const accessToken = localStorage.getItem('access-token');

    try {
        await fileService.post(
            '/upload/check',
            { filename: file.name, size: file.size },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const formData = new FormData();
        formData.append('file', file);

        const source = axios.CancelToken.source();

        ee.on('upload/abort', () => {
            source.cancel('Upload cancelled');
        });

        await fileService.post('/upload', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cancelToken: source.token,
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

                ee.emit('upload/progress-changed', uploadProgress);
            },
        });
    } catch (error) {
        if (axios.isCancel(error)) {
            throw new CancelError(error.message);
        }

        throw new Error(error.response.data.message);
    }
};
