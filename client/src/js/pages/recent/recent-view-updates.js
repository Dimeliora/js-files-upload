import { getFileElms } from './recent-dom-elements';

export const hideRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.add('recent__view-all--hidden');
};

export const showRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.remove('recent__view-all--hidden');
};

export const getFileActionsShowHandler = (recentFilesListElm) => (e) => {
    for (const recentFilesListItemElm of recentFilesListElm.children) {
        const { fileActionsElm } = getFileElms(recentFilesListItemElm);

        const isOpened = fileActionsElm.classList.contains(
            'file__actions-list--visible'
        );
        const isButtonOfListItemElm =
            e.target.closest('[data-file]') === recentFilesListItemElm;

        if (isButtonOfListItemElm && !isOpened) {
            fileActionsElm.classList.add('file__actions-list--visible');
        } else {
            fileActionsElm.classList.remove('file__actions-list--visible');
        }
    }
};
