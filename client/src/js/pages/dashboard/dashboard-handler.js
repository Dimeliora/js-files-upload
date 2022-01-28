import authState from '../../state/auth-state';
import { getDashboardElms } from './dashboard-dom-elements';
import { createDashboardHTML } from './dashboard-template-creators';
import { footerHandler } from '../../components/footer/footer-handler';

export const dashboardHandler = (appContainer) => {
    const { user } = authState;

    appContainer.innerHTML = createDashboardHTML(user);

    const dashboardElms = getDashboardElms(appContainer);

    footerHandler(dashboardElms.dashboardBlockElm);
};
