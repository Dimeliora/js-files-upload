import { ee } from '../../helpers/event-emitter';
import { footerHandler } from '../../components/footer/footer-handler';
import { headerHandler } from '../../components/header/header-handler';
import { getRecentElms, getFileElms } from './recent-dom-elements';
import {
    hideRecentLoadElm,
    showRecentLoadElm,
    getFileActionsShowHandler,
} from './recent-view-updates';
import {
    createRecentHTML,
    createViewAllHTML,
    createRecentFileHTML,
    createRecentPlaceholderHTML,
} from './recent-template-creators';
import { createLoaderHTML } from '../../components/loader/loader-template-creators';
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

    if (recentState.recentFiles.length === 0) {
        return createRecentPlaceholderHTML();
    }

    const recentListMarkup = recentState.recentFiles
        .map((file) => createRecentFileHTML(file))
        .join(' ');

    return recentListMarkup;
};

const fetchRecentFilesHandler = async (recentElms, count = 0) => {
    recentElms.recentLoadElm.innerHTML = createLoaderHTML();

    await getRecentFiles(count);
};

const renderRecentFilesList = (recentElms) => {
    const { recentLoadElm, recentFilesListElm } = recentElms;
    const { isFullUploadsList, recentFiles } = recentState;

    recentFilesListElm.innerHTML = getRecentFilesListMarkup();

    setFileActionsButtonsClickHandler(recentFilesListElm);

    if (isFullUploadsList || recentFiles.length < 5) {
        recentLoadElm.innerHTML = '';

        hideRecentLoadElm(recentLoadElm);
    } else {
        recentLoadElm.innerHTML = createViewAllHTML();
        const recentViewAllElm = recentLoadElm.firstElementChild;

        showRecentLoadElm(recentLoadElm);

        recentViewAllElm.addEventListener(
            'click',
            getViewAllUploadsHandler(recentElms)
        );
    }
};

const setFileActionsButtonsClickHandler = (recentFilesListElm) => {
    for (const recentFilesListItemElm of recentFilesListElm.children) {
        const { fileButtonElm } = getFileElms(recentFilesListItemElm);

        fileButtonElm.addEventListener(
            'click',
            getFileActionsShowHandler(recentFilesListElm)
        );
    }
};

const getViewAllUploadsHandler = (recentElms) => async () => {
    await fetchRecentFilesHandler(recentElms);

    recentState.setFullUploadList();
    renderRecentFilesList(recentElms);
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
        await fetchRecentFilesHandler(recentElms, 5);
    }

    renderRecentFilesList(recentElms);

    ee.on(
        'upload/resync-needed',
        resetRecentListActuality,
        'recent:upload/resync-needed'
    );
};
