export const getRecentElms = (rootElement) => ({
    recentBlockElm: rootElement.querySelector("[data-recent-block]"),
    recentFilesListElm: rootElement.querySelector("[data-recent-list]"),
    recentLoadElm: rootElement.querySelector("[data-recent-load]"),
});

export const getRecentFileElms = (recentFileElm) => ({
    fileNameElm: recentFileElm.querySelector("[data-file-name]"),
    fileDownloadElm: recentFileElm.querySelector("[data-file-download]"),
    fileDeleteElm: recentFileElm.querySelector("[data-file-delete]"),
});

