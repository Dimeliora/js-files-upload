import recentState from "../../state/recent-state";
import { ee } from "../../helpers/event-emitter";
import { headerHandler } from "../../components/header/header-handler";
import { footerHandler } from "../../components/footer/footer-handler";
import { getRecentElms, getRecentFileElms } from "./recent-dom-elements";
import {
    hideRecentLoadElm,
    showRecentLoadElm,
    setDeletingFileView,
    resetDeletingFileView,
    setFullHeightRecentBlockClass,
} from "./recent-view-updates";
import {
    createRecentHTML,
    createViewAllHTML,
    createRecentFileHTML,
    createRecentErrorHTML,
    createRecentPlaceholderHTML,
} from "./recent-template-creators";
import { createLoaderHTML } from "../../components/loader/loader-template-creators";
import { alertHandle } from "../../components/alerts/alerts-handler";
import {
    getFiles,
    deleteFiles,
    downloadFile,
} from "../../services/file-service";

let fileDeletionTimerId;
const MAX_RECENT_FILES_COUNT = 5;
const DELETE_FILE_DEBOUNCE_TIME = 1000;

const fetchRecentFilesHandler = async (recentElms) => {
    recentElms.recentLoadElm.innerHTML = createLoaderHTML();

    await getRecentFiles();
};

const getRecentFiles = async () => {
    const filesCount = recentState.isFullUploadsList
        ? 0
        : MAX_RECENT_FILES_COUNT;

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

    if (isFullUploadsList || recentFiles.length < MAX_RECENT_FILES_COUNT) {
        hideRecentLoadElm(recentLoadElm);
    } else {
        recentState.setCanFetchMore();

        recentLoadElm.innerHTML = createViewAllHTML();
        const recentViewAllElm = recentLoadElm.firstElementChild;

        showRecentLoadElm(recentLoadElm);

        recentViewAllElm.addEventListener(
            "click",
            getViewAllUploadsClickHandler(recentElms)
        );
    }

    recentFilesListElm.innerHTML = getRecentFilesListMarkup();

    if (recentFiles.length > 0) {
        setFileActionsClickHandlers(recentElms, recentFilesListElm.children);
    }
};

const getRecentFilesListMarkup = () => {
    const { isError, canFetchMore, recentFiles } = recentState;

    if (isError) {
        return createRecentErrorHTML();
    }

    if (recentFiles.length === 0) {
        return createRecentPlaceholderHTML(canFetchMore);
    }

    const recentListMarkup = recentFiles
        .map((file) => createRecentFileHTML(file))
        .join(" ");

    return recentListMarkup;
};

const setFileActionsClickHandlers = (recentElms, recentListItems) => {
    for (const listItem of recentListItems) {
        const fileId = listItem.dataset.file;

        const { fileNameElm, fileDownloadElm, fileDeleteElm } =
            getRecentFileElms(listItem);

        const filename = fileNameElm.textContent.trim();

        fileDownloadElm.addEventListener(
            "click",
            getFileDownloadHandler(fileId, filename)
        );

        fileDeleteElm.addEventListener(
            "click",
            getFileDeleteHandler(recentElms, listItem, fileId)
        );
    }
};

const getViewAllUploadsClickHandler = (recentElms) => async () => {
    const renderedFilesIds = recentState.recentFiles.map((file) => file._id);

    recentState.setFullUploadList();

    await fetchRecentFilesHandler(recentElms);

    fullfillRecentFilesList(recentElms, renderedFilesIds);

    setFullHeightRecentBlockClass(recentElms.recentBlockElm);
};

const fullfillRecentFilesList = (recentElms, renderedFilesIds) => {
    const { recentFilesListElm, recentLoadElm } = recentElms;
    const { recentFiles, canFetchMore } = recentState;

    const fetchedFiles = recentFiles.filter(
        (file) => !renderedFilesIds.includes(file._id)
    );

    if (fetchedFiles.length === 0) {
        recentFilesListElm.innerHTML =
            createRecentPlaceholderHTML(canFetchMore);

        hideRecentLoadElm(recentLoadElm);
        return;
    }

    const fetchedFilesListItemsMarkup = fetchedFiles
        .map((file) => createRecentFileHTML(file))
        .join(" ");

    if (renderedFilesIds.length > 0) {
        recentFilesListElm.insertAdjacentHTML(
            "beforeend",
            fetchedFilesListItemsMarkup
        );
    } else {
        recentFilesListElm.innerHTML = fetchedFilesListItemsMarkup;
    }

    hideRecentLoadElm(recentLoadElm);

    const fetchedListItems = [...recentFilesListElm.children].slice(
        renderedFilesIds.length
    );

    setFileActionsClickHandlers(recentElms, fetchedListItems);
};

const getFileDownloadHandler = (fileId, filename) => () => {
    const fileSrc = downloadFile(fileId);

    const link = document.createElement("a");
    link.download = filename;
    link.href = fileSrc;

    document.body.append(link);
    link.click();
    link.remove();
};

const getFileDeleteHandler = (recentElms, recentFileElm, fileId) => () => {
    clearTimeout(fileDeletionTimerId);

    recentState.addFileToDelete({ fileElm: recentFileElm, id: fileId });

    setDeletingFileView(recentFileElm);

    fileDeletionTimerId = setTimeout(
        getDeleteFilesRoutine(recentElms),
        DELETE_FILE_DEBOUNCE_TIME
    );
};

const getDeleteFilesRoutine = (recentElms) => async () => {
    try {
        const filesToDeleteIds = recentState.filesToDelete.map(({ id }) => id);

        await deleteFiles(filesToDeleteIds);

        for (const fileToDelete of recentState.filesToDelete) {
            const { fileElm, id } = fileToDelete;

            recentState.deleteFileFromRecent(id);
            fileElm.remove();
        }

        if (recentState.recentFiles.length === 0) {
            recentElms.recentFilesListElm.innerHTML =
                createRecentPlaceholderHTML(recentState.canFetchMore);
        }
    } catch (error) {
        alertHandle(error.message, "error");

        for (const fileToDelete of recentState.filesToDelete) {
            resetDeletingFileView(fileToDelete.fileElm);
        }
    } finally {
        recentState.removeFilesToDelete();
    }
};

export const recentHandler = async (appContainer) => {
    appContainer.innerHTML = createRecentHTML();

    const recentElms = getRecentElms(appContainer);

    headerHandler(recentElms.recentBlockElm);
    footerHandler(recentElms.recentBlockElm);

    if (recentState.isFullUploadsList) {
        setFullHeightRecentBlockClass(recentElms.recentBlockElm);
    }

    await fetchRecentFilesHandler(recentElms);

    renderRecentFilesList(recentElms);
};
