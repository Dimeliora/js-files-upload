import { authHandler } from '../pages/auth/auth-handler';
import { dashboardHandler } from '../pages/dashboard/dashboard-handler';
import { uploadHandler } from '../pages/upload/upload-handler';
import { recentHandler } from '../pages/recent/recent-handler';

export const routes = {
    '/': dashboardHandler,
    auth: authHandler,
    recent: recentHandler,
    upload: uploadHandler,
};
