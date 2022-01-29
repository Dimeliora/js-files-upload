import { ee } from '../../helpers/event-emitter';
import { footerHandler } from '../../components/footer/footer-handler';
import { headerHandler } from '../../components/header/header-handler';
import { getRecentElms, getRecentFileElms } from './recent-dom-elements';
import { hideRecentLoadElm, showRecentLoadElm } from './recent-view-updates';
import {
    createRecentHTML,
    createViewAllHTML,
    createRecentFileHTML,
    createRecentPlaceholderHTML,
} from './recent-template-creators';
import { createLoaderHTML } from '../../components/loader/loader-template-creators';
import { getFiles, downloadFile } from '../../services/file-service';
import { alertHandle } from '../../components/alerts/alerts-handler';
import recentState from '../../state/recent-state';

const getRecentFiles = async (max = 0) => {
    try {
        const files = await getFiles(max);

        recentState.setRecentFiles(files);
        ee.emit('recent/resync-needed');
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

    setFileActionsClickHandlers(recentFilesListElm.children);

    if (isFullUploadsList || recentFiles.length < 5) {
        recentLoadElm.innerHTML = '';

        hideRecentLoadElm(recentLoadElm);
    } else {
        recentLoadElm.innerHTML = createViewAllHTML();
        const recentViewAllElm = recentLoadElm.firstElementChild;

        showRecentLoadElm(recentLoadElm);

        recentViewAllElm.addEventListener(
            'click',
            getViewAllUploadsClickHandler(recentElms)
        );
    }
};

const setFileActionsClickHandlers = (recentFileElms) => {
    for (const recentFileElm of recentFileElms) {
        const fileId = recentFileElm.dataset.file;

        const { fileNameElm, fileDownloadElm, fileDeleteElm } =
            getRecentFileElms(recentFileElm);

        fileDownloadElm.addEventListener(
            'click',
            getFileDownloadHandler(fileId, fileNameElm.textContent.trim())
        );

        fileDeleteElm.addEventListener('click', () => {});
    }
};

const getFileDownloadHandler = (fileId, filename) => async () => {
    try {
        const fileBlob = await downloadFile(fileId);

        const link = document.createElement('a');
        link.download = filename;
        link.href = URL.createObjectURL(fileBlob);

        document.body.append(link);
        link.click();

        URL.revokeObjectURL(link.href);
        link.remove();
    } catch (error) {
        alertHandle(error.message, 'error');
    }
};

const getViewAllUploadsClickHandler = (recentElms) => async () => {
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
