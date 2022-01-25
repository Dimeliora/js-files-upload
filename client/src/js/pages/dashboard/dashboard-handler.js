import state from '../../state/state';
import { createDashboardHTML } from './dashboard-template-creators';

export const dashboardHandler = (appContainer) => {
    const { user } = state;

    appContainer.innerHTML = createDashboardHTML(user);
};
