import { ee } from '../../helpers/event-emitter';
import { createFooterHTML } from './footer-template-creators';
import { getFooterElms } from './footer-dom-elements';
import { updateSyncStatusElm } from './footer-view-updates';
import appState from '../../state/app-state';

const getFooterDOMElement = () => {
    const rootElm = document.createElement('footer');
    rootElm.classList.add('footer');

    rootElm.insertAdjacentHTML('afterbegin', createFooterHTML());

    return rootElm;
};

const getSyncStatusUpdateHandler = (syncElm) => () => {
    updateSyncStatusElm(syncElm, appState.lastSyncTime, appState.syncError);
};

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const footerHandler = (container) => {
    const footerElement = getFooterDOMElement();

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
