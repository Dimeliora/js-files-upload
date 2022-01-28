import { ee } from '../../helpers/event-emitter';
import { footerHandler } from '../../components/footer/footer-handler';
import { headerHandler } from '../../components/header/header-handler';
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

const getRecentFiles = async (max = 0) => {
    try {
        const filesData = await getFiles(max);

        recentState.setRecentFiles(filesData);
    } catch (error) {
        recentState.setError();

        ee.emit('recent/sync-error');
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

const resetRecentListActuality = () => {
    recentState.resetRecentListActualState();
};

export const recentHandler = async (appContainer) => {
    appContainer.innerHTML = createRecentHTML();

    const recentElms = getRecentElms(appContainer);

    headerHandler(recentElms.recentBlockElm);
    footerHandler(recentElms.recentBlockElm);

    if (!recentState.isRecentListActual) {
        recentState.setFetching();

        renderRecentContentBlock(recentElms);

        await getRecentFiles(5);
    }

    renderRecentContentBlock(recentElms);

    ee.on('upload/resync-needed', resetRecentListActuality);
};
