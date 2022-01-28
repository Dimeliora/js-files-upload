import appState from '../../state/app-state';
import { getDashboardElms } from './dashboard-dom-elements';
import { createDashboardHTML } from './dashboard-template-creators';
import { userStorageInfoUpdate } from './dashboard-view-updates';
import { footerHandler } from '../../components/footer/footer-handler';

export const dashboardHandler = (appContainer) => {
    const { username, email, totalDiskSpace, usedDiskSpace } = appState;

    appContainer.innerHTML = createDashboardHTML(username, email);

    const dashboardElms = getDashboardElms(appContainer);

    footerHandler(dashboardElms.dashboardBlockElm);

    userStorageInfoUpdate(dashboardElms, totalDiskSpace, usedDiskSpace);
};
