import recentState from "../../state/recent-state";
import { ee } from "../../helpers/event-emitter";
import { headerHandler } from "../../components/header/header-handler";
import { footerHandler } from "../../components/footer/footer-handler";
import {
    getRecentElms,
    getRecentFileElms,
    getRecentFileElmById,
} from "./recent-dom-elements";
import {
    hideRecentLoadElm,
    showRecentLoadElm,
    setDeletingFileClass,
    resetDeletingFileClass,
    enableRecentFileControls,
    disableRecentFileControls,
    updateDownloadProgressElm,
    removeDownloadProgressElm,
    prepareDownloadProgressElm,
    setFullHeightRecentBlockClass,
} from "./recent-view-updates";
import {
    createRecentHTML,
    createViewAllHTML,
    createRecentFileHTML,
    createRecentPlaceholderHTML,
} from "./recent-template-creators";
import { createLoaderHTML } from "../../components/loader/loader-template-creators";
import { alertHandle } from "../../components/alerts/alerts-handler";
import {
    getFiles,
    deleteFiles,
    downloadFile,
} from "../../services/file-service";

const MAX_RECENT_FILES_COUNT = 5;

const fetchRecentFilesHandler = async (recentElms) => {
    recentElms.recentLoadElm.innerHTML = createLoaderHTML();

    await getRecentFiles();
};

const getRecentFiles = async (max = MAX_RECENT_FILES_COUNT) => {
    const filesCount = recentState.isFullUploadsList ? 0 : max;

    try {
        const files = await getFiles(filesCount);

        recentState.setRecentFiles(files);
        ee.emit("recent/resync-needed");
    } catch (error) {
        recentState.setError();
    }
};

const renderRecentFilesList = (recentElms) => {
    const { recentLoadElm, recentFilesListElm } = recentElms;
    const { isFullUploadsList, recentFiles } = recentState;

    recentFilesListElm.innerHTML = getRecentFilesListMarkup();

    if (recentFiles.length > 0) {
        setFileActionsClickHandlers(recentElms);
    }

    if (isFullUploadsList || recentFiles.length < MAX_RECENT_FILES_COUNT) {
        recentLoadElm.innerHTML = "";

        hideRecentLoadElm(recentLoadElm);
    } else {
        recentLoadElm.innerHTML = createViewAllHTML();
        const recentViewAllElm = recentLoadElm.firstElementChild;

        showRecentLoadElm(recentLoadElm);

        recentViewAllElm.addEventListener(
            "click",
            getViewAllUploadsClickHandler(recentElms)
        );
    }
};

const getRecentFilesListMarkup = () => {
    const { isError, recentFiles } = recentState;

    if (isError) {
        return createRecentPlaceholderHTML("error");
    }

    if (recentFiles.length === 0) {
        return createRecentPlaceholderHTML();
    }

    const recentListMarkup = recentFiles
        .map((file) => createRecentFileHTML(file))
        .join(" ");

    return recentListMarkup;
};

const setFileActionsClickHandlers = (recentElms) => {
    const { recentFilesListElm } = recentElms;

    for (const recentFileElm of recentFilesListElm.children) {
        const fileId = recentFileElm.dataset.file;

        const { fileNameElm, fileDownloadElm, fileDeleteElm } =
            getRecentFileElms(recentFileElm);

        const filename = fileNameElm.textContent.trim();

        fileDownloadElm.addEventListener(
            "click",
            getFileDownloadHandler(recentFileElm, fileId, filename)
        );

        fileDeleteElm.addEventListener(
            "click",
            getFileDeleteHandler(recentElms, recentFileElm, fileId)
        );
    }
};

const getViewAllUploadsClickHandler = (recentElms) => async () => {
    recentState.setFullUploadList();

    await fetchRecentFilesHandler(recentElms);

    renderRecentFilesList(recentElms);

    setFullHeightRecentBlockClass(recentElms.recentBlockElm);
};

const getFileDownloadHandler =
    (recentFileElm, fileId, filename) => async () => {
        const { fileProgressElm, progressLength } =
            prepareDownloadProgressElm(recentFileElm);

        disableRecentFileControls(recentFileElm);

        const unsubscribeProgressChangeEvent = ee.on(
            "recent/progress-changed",
            ({ id, progress }) => {
                if (id === fileId) {
                    updateDownloadProgressElm(
                        fileProgressElm,
                        progressLength,
                        progress
                    );
                }
            }
        );

        const unsubscribeDownloadCompleteEvent = ee.on(
            "recent/download-complete",
            (id) => {
                if (id === fileId) {
                    removeDownloadProgressElm(fileProgressElm);
                }
            }
        );

        try {
            const fileBlob = await downloadFile(fileId);

            const link = document.createElement("a");
            link.download = filename;
            link.href = URL.createObjectURL(fileBlob);

            document.body.append(link);
            link.click();

            URL.revokeObjectURL(link.href);
            link.remove();
        } catch (error) {
            alertHandle(error.message, "error");
        } finally {
            enableRecentFileControls(recentFileElm);

            unsubscribeProgressChangeEvent();
            unsubscribeDownloadCompleteEvent();
        }
    };

let fileDeletionTimerId;
const getFileDeleteHandler = (recentElms, recentFileElm, fileId) => () => {
    clearTimeout(fileDeletionTimerId);

    recentState.addFileToDelete({ fileElm: recentFileElm, id: fileId });

    setDeletingFileClass(recentFileElm);
    disableRecentFileControls(recentFileElm);

    fileDeletionTimerId = setTimeout(getDeleteFilesRoutine(recentElms), 1000);
};

const getDeleteFilesRoutine = (recentElms) => async () => {
    try {
        const filesToDeleteIds = recentState.filesToDelete.map(({ id }) => id);

        await deleteFiles(filesToDeleteIds);

        if (recentState.isFullUploadsList) {
            for (const fileToDelete of recentState.filesToDelete) {
                const { fileElm, id } = fileToDelete;

                recentState.deleteFileFromRecent(id);
                fileElm.remove();
            }

            if (recentState.recentFiles.length === 0) {
                recentElms.recentFilesListElm.innerHTML =
                    createRecentPlaceholderHTML();
            }
        } else {
            await getRecentFiles();

            renderRecentFilesList(recentElms);
        }
    } catch (error) {
        alertHandle(error.message, "error");
    } finally {
        recentState.removeFilesToDelete();
    }
};

const resetRecentListActuality = () => {
    recentState.resetRecentListActualState();
};

export const recentHandler = async (appContainer) => {
    appContainer.innerHTML = createRecentHTML();

    const recentElms = getRecentElms(appContainer);

    headerHandler(recentElms.recentBlockElm);
    footerHandler(recentElms.recentBlockElm);

    if (recentState.isFullUploadsList) {
        setFullHeightRecentBlockClass(recentElms.recentBlockElm);
    }

    if (!recentState.isRecentListActual) {
        await fetchRecentFilesHandler(recentElms);
    }

    renderRecentFilesList(recentElms);

    ee.on(
        "upload/resync-needed",
        resetRecentListActuality,
        "recent:upload/resync-needed"
    );
};
