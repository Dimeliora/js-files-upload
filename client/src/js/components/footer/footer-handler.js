import appState from '../../state/app-state';
import { ee } from '../../helpers/event-emitter';
import {
    createFooterDOMElement,
    updateSyncStatusElm,
} from './footer-view-updates';
import { getFooterElms } from './footer-dom-elements';

const getSyncStatusUpdateHandler = (syncElm) => () => {
    updateSyncStatusElm(syncElm, appState.lastSyncTime, appState.syncError);
};

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const footerHandler = (container) => {
    const footerElement = createFooterDOMElement();

    container.append(footerElement);

    const footerElms = getFooterElms(footerElement);

    updateSyncStatusElm(
        footerElms.footerSyncElm,
        appState.lastSyncTime,
        appState.syncError
    );

    footerElms.footerLogoutElm.addEventListener('click', logoutHandler);

    ee.on(
        'app/update-sync-status',
        getSyncStatusUpdateHandler(footerElms.footerSyncElm),
        'footer:app/update-sync-status'
    );
};
