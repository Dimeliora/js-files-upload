import { createDashboardHTML } from './dashboard-template-creators';

export const dashboardHandler = (appContainer) => {
    appContainer.innerHTML = createDashboardHTML();
};
