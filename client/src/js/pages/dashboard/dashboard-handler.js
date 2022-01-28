import appState from '../../state/app-state';
import { getDashboardElms } from './dashboard-dom-elements';
import { createDashboardHTML } from './dashboard-template-creators';
import { footerHandler } from '../../components/footer/footer-handler';

export const dashboardHandler = (appContainer) => {
    const { username, email } = appState;

    appContainer.innerHTML = createDashboardHTML(username, email);

    const dashboardElms = getDashboardElms(appContainer);

    footerHandler(dashboardElms.dashboardBlockElm);
};
