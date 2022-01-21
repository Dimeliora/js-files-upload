import { dashboardHandler } from '../dashboard/dashboard-handler';
import { uploadHandler } from '../upload/upload-handler';
import { recentHandler } from '../recent/recent-handler';

export const routes = {
    '/': dashboardHandler,
    'new-upload': uploadHandler,
    'recent': recentHandler,
};
