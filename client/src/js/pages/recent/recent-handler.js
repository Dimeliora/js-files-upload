import { ee } from '../../helpers/event-emitter';
import { footerHandler } from '../../components/footer/footer-handler';
import { headerHandler } from '../../components/header/header-handler';
import { getRecentElms, getRecentFileElms } from './recent-dom-elements';
import {
    hideRecentLoadElm,
    showRecentLoadElm,
    deactivateRecentFilesList,
    activateRecentFilesList,
} from './recent-view-updates';
import {
    createRecentHTML,
    createViewAllHTML,
    createRecentFileHTML,
    createRecentPlaceholderHTML,
} from './recent-template-creators';
import { createLoaderHTML } from '../../components/loader/loader-template-creators';
import {
    getFiles,
    downloadFile,
    deleteFile,
} from '../../services/file-service';
import { alertHandle } from '../../components/alerts/alerts-handler';
import recentState from '../../state/recent-state';

const MAX_RECENT_FILES_COUNT = 5;

const getRecentFiles = async (max = MAX_RECENT_FILES_COUNT) => {
    const filesCount = recentState.isFullUploadsList ? 0 : max;

    try {
        const files = await getFiles(filesCount);

        recentState.setRecentFiles(files);
        ee.emit('recent/resync-needed');
    } catch (error) {
        recentState.setError();
    }
};

const getRecentFilesListMarkup = () => {
    const { isError, recentFiles } = recentState;

    if (isError) {
        return createRecentPlaceholderHTML('error');
    }

    if (recentFiles.length === 0) {
        return createRecentPlaceholderHTML();
    }

    const recentListMarkup = recentFiles
        .map((file) => createRecentFileHTML(file))
        .join(' ');

    return recentListMarkup;
};

const fetchRecentFilesHandler = async (recentElms) => {
    recentElms.recentLoadElm.innerHTML = createLoaderHTML();

    await getRecentFiles();
};

const renderRecentFilesList = (recentElms) => {
    const { recentLoadElm, recentFilesListElm } = recentElms;
    const { isFullUploadsList, recentFiles } = recentState;

    recentFilesListElm.innerHTML = getRecentFilesListMarkup();

    if (recentFiles.length > 0) {
        setFileActionsClickHandlers(recentElms);
    }

    if (isFullUploadsList) {
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

const setFileActionsClickHandlers = (recentElms) => {
    const { recentFilesListElm } = recentElms;

    for (const recentFileElm of recentFilesListElm.children) {
        const fileId = recentFileElm.dataset.file;

        const { fileNameElm, fileDownloadElm, fileDeleteElm } =
            getRecentFileElms(recentFileElm);

        fileDownloadElm.addEventListener(
            'click',
            getFileDownloadHandler(fileId, fileNameElm.textContent.trim())
        );

        fileDeleteElm.addEventListener(
            'click',
            getFileDeleteHandler(recentElms, fileId)
        );
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

const getFileDeleteHandler = (recentElms, fileId) => async () => {
    const { recentFilesListElm } = recentElms;

    deactivateRecentFilesList(recentFilesListElm);

    try {
        await deleteFile(fileId);

        await getRecentFiles();

        renderRecentFilesList(recentElms);
    } catch (error) {
        alertHandle(error.message, 'error');
    } finally {
        activateRecentFilesList(recentFilesListElm);
    }
};

const getViewAllUploadsClickHandler = (recentElms) => async () => {
    recentState.setFullUploadList();

    await fetchRecentFilesHandler(recentElms);

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
        await fetchRecentFilesHandler(recentElms);
    }

    renderRecentFilesList(recentElms);

    ee.on(
        'upload/resync-needed',
        resetRecentListActuality,
        'recent:upload/resync-needed'
    );
};
