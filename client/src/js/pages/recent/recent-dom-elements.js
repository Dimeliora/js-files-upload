export const getRecentElms = (rootElement) => ({
    recentBlockElm: rootElement.querySelector("[data-recent-block]"),
    recentFilesListElm: rootElement.querySelector("[data-recent-list]"),
    recentLoadElm: rootElement.querySelector("[data-recent-load]"),
});

export const getRecentFileElms = (recentFileElm) => ({
    fileNameElm: recentFileElm.querySelector("[data-file-name]"),
    fileSizeElm: recentFileElm.querySelector("[data-file-size]"),
    fileActionsElm: recentFileElm.querySelector("[data-file-actions]"),
    fileDownloadElm: recentFileElm.querySelector("[data-file-download]"),
    fileDeleteElm: recentFileElm.querySelector("[data-file-delete]"),
});

export const getRecentFileProgressElm = (recentFileElm) => {
    return recentFileElm.querySelector("[data-file-progress]");
};
