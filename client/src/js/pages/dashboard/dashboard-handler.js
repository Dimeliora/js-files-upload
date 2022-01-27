import authState from '../../state/auth-state';
import { ee } from '../../helpers/event-emitter';
import { getDashboardElms } from './dashboard-dom-elements';
import { createDashboardHTML } from './dashboard-template-creators';

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const dashboardHandler = (appContainer) => {
    const { user } = authState;

    appContainer.innerHTML = createDashboardHTML(user);

    const dashboardElms = getDashboardElms(appContainer);

    dashboardElms.dashboardLogoutElm.addEventListener('click', logoutHandler);
};
