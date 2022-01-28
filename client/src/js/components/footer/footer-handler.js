import { ee } from '../../helpers/event-emitter';
import { createFooterHTML } from './footer-template-creators';
import { getFooterElms } from './footer-dom-elements';
import { updateSyncStatus } from './footer-view-updates';
import { getFormattedPassedTime } from '../../helpers/formatters';
import appState from '../../state/app-state';

const getFooterDOMElement = () => {
    const rootElm = document.createElement('footer');
    rootElm.classList.add('footer');

    rootElm.insertAdjacentHTML('afterbegin', createFooterHTML());

    return rootElm;
};

const updateSyncInfo = (syncElm, syncDate, isSyncError) => {
    updateSyncStatus(
        syncElm,
        getFormattedPassedTime(new Date(syncDate)),
        isSyncError
    );
};

const getSyncStatusUpdateHandler = (syncElm) => () => {
    updateSyncInfo(syncElm, appState.lastSyncTime, appState.isSyncError);
};

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const footerHandler = (container) => {
    const footerElement = getFooterDOMElement();

    container.append(footerElement);

    const footerElms = getFooterElms(footerElement);

    updateSyncInfo(
        footerElms.footerSyncElm,
        appState.lastSyncTime,
        appState.isSyncError
    );

    footerElms.footerLogoutElm.addEventListener('click', logoutHandler);

    ee.on(
        'app/update-sync-status',
        getSyncStatusUpdateHandler(footerElms.footerSyncElm)
    );
};
