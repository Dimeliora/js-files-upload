import { footerHandler } from '../../components/footer/footer-handler';
import { getRecentElms, getRecentContentElms } from './recent-dom-elements';
import {
    createRecentHTML,
    createRecentContentHTML,
    createRecentFileHTML,
    createRecentPlaceholderHTML,
} from './recent-template-creators';
import { createLoaderHTML } from '../../components/loader/loader-template-creators';
import { viewAllElmStateHandler } from './recent-view-updates';
import { getFiles } from '../../services/file-service';
import recentState from '../../state/recent-state';
import appState from '../../state/app-state';

const getRecentFiles = async (max = 0) => {
    try {
        const filesData = await getFiles(max);

        recentState.setRecentFiles(filesData);
        appState.setSyncDate();
    } catch (error) {
        recentState.setError();
        //TODO - Sync error ?
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
    if (recentState.isFetching) {
        recentElms.recentContentElm.innerHTML = createLoaderHTML();
        return;
    }

    recentElms.recentContentElm.innerHTML = createRecentContentHTML();
    const recentContentElms = getRecentContentElms(recentElms.recentContentElm);

    recentContentElms.recentListElm.innerHTML = getRecentFilesListMarkup();

    viewAllElmStateHandler(
        recentContentElms.recentViewAllElm,
        recentState.totalFilesCount > 5
    );
};

export const recentHandler = async (appContainer) => {
    appContainer.innerHTML = createRecentHTML();

    const recentElms = getRecentElms(appContainer);

    footerHandler(recentElms.recentBlockElm);

    if (appState.isSyncNeeded) {
        recentState.setFetching();

        renderRecentContentBlock(recentElms);

        await getRecentFiles(5);
    }

    renderRecentContentBlock(recentElms);
};
