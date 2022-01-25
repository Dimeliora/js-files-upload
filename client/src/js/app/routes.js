import { authHandler } from '../auth/auth-handler';
import { dashboardHandler } from '../dashboard/dashboard-handler';
import { uploadHandler } from '../upload/upload-handler';
import { recentHandler } from '../recent/recent-handler';

export const routes = {
    '/': dashboardHandler,
    auth: authHandler,
    recent: recentHandler,
    upload: uploadHandler,
};
