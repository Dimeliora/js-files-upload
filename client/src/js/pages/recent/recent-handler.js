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
        const files = await getFiles(max);

        recentState.setRecentFiles(files);
    } catch (error) {
        recentState.setError();
    }
};

const getRecentFilesListMarkup = () => {
    if (recentState.isError) {
        return createRecentPlaceholderHTML('error');
    }

    if (!recentState.hasFiles) {
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
        recentState.hasFiles
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
