import { ee } from '../../helpers/event-emitter';
import { getRecentElms, getRecentContentElms } from './recent-dom-elements';
import {
    createRecentHTML,
    createRecentContentHTML,
    createRecentFileHTML,
    createRecentPlaceholderHTML,
} from './recent-template-creators';
import { viewAllElmStateHandler } from './recent-view-updates';
import { getFiles } from '../../services/file-service';
import recentState from '../../state/recent-state';

const getRecentFiles = async (max = 0) => {
    try {
        const filesData = await getFiles(max);

        recentState.setRecentFiles(filesData);
    } catch (error) {
        recentState.setError();
    }
};

const getRecentFilesListMarkup = () => {
    if (recentState.isError) {
        return createRecentPlaceholderHTML('error');
    }

    if (recentState.totalFilesCount === 0) {
        return createRecentPlaceholderHTML();
    }

    const recentListMarkup = recentState.recentFiles
        .map((file) => createRecentFileHTML(file))
        .join(' ');

    return recentListMarkup;
};

const renderRecentContentBlock = (recentElms) => {
    recentElms.recentContentElm.innerHTML = createRecentContentHTML();
    const recentContentElms = getRecentContentElms(recentElms.recentContentElm);

    recentContentElms.recentListElm.innerHTML = getRecentFilesListMarkup();

    viewAllElmStateHandler(
        recentContentElms.recentViewAllElm,
        recentState.totalFilesCount > 5
    );
};

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const recentHandler = async (appContainer) => {
    appContainer.innerHTML = createRecentHTML();

    const recentElms = getRecentElms(appContainer);

    await getRecentFiles(5);

    renderRecentContentBlock(recentElms);

    recentElms.recentLogoutElm.addEventListener('click', logoutHandler);
};
