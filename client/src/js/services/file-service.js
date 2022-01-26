import axios from 'axios';

import { BASE_URL } from '../config/base-url';

const fileService = axios.create({
    baseURL: `${BASE_URL}/file`,
});
