export const hideRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.add('recent__view-all--hidden');
};

export const showRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.remove('recent__view-all--hidden');
};

export const deactivateRecentFilesList = (recentFilesListElm) => {
    recentFilesListElm.classList.add('recent__list-item--inactive');
};

export const activateRecentFilesList = (recentFilesListElm) => {
    recentFilesListElm.classList.remove('recent__list-item--inactive');
};

export const setFullHeightRecentBlockClass = (recentElm) => {
    recentElm.classList.add('recent--full-height');
};
