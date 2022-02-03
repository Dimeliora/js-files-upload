import { getRecentFileElms } from "./recent-dom-elements";

export const hideRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.innerHTML = "";
    recentLoadElm.classList.add("recent__view-all--hidden");
};

export const showRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.remove("recent__view-all--hidden");
};

export const setFullHeightRecentBlockClass = (recentElm) => {
    recentElm.classList.add("recent--full-height");
};

export const setDeletingFileView = (recentFileElm) => {
    const { fileDownloadElm, fileDeleteElm } = getRecentFileElms(recentFileElm);

    recentFileElm.classList.add("file--deleting");
    fileDownloadElm.setAttribute("disabled", true);
    fileDeleteElm.setAttribute("disabled", true);
};

export const resetDeletingFileView = (recentFileElm) => {
    const { fileDownloadElm, fileDeleteElm } = getRecentFileElms(recentFileElm);

    recentFileElm.classList.remove("file--deleting");
    fileDownloadElm.removeAttribute("disabled");
    fileDeleteElm.removeAttribute("disabled");
};
