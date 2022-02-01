export const getRecentElms = (rootElement) => ({
    recentBlockElm: rootElement.querySelector('[data-recent-block]'),
    recentFilesListElm: rootElement.querySelector('[data-recent-list]'),
    recentLoadElm: rootElement.querySelector('[data-recent-load]'),
});

export const getRecentFileElmById = (recentFilesListElm, fileId) => {
    return recentFilesListElm.querySelector(`[data-file="${fileId}"]`);
};

export const getRecentFileElms = (recentFileElm) => ({
    fileNameElm: recentFileElm.querySelector('[data-file-name]'),
    fileSizeElm: recentFileElm.querySelector('[data-file-size]'),
    fileDownloadElm: recentFileElm.querySelector('[data-file-download]'),
    fileDeleteElm: recentFileElm.querySelector('[data-file-delete]'),
});

export const getRecentFileLoder = (recentFileElm) => {
    return recentFileElm.querySelector('[data-file-loader]');
};
