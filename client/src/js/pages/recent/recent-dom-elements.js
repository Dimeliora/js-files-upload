export const getRecentElms = (rootElement) => ({
    recentBlockElm: rootElement.querySelector('[data-recent-block]'),
    recentFilesListElm: rootElement.querySelector('[data-recent-list]'),
    recentLoadElm: rootElement.querySelector('[data-recent-load]'),
});

export const getFileElms = (fileElm) => ({
    fileDownloadElm: fileElm.querySelector('[data-file-download]'),
    fileDeleteElm: fileElm.querySelector('[data-file-delete]'),
});
