import {
    getRecentFileElms,
    getRecentFileProgressElm,
} from "./recent-dom-elements";
import { createFileDownloadProgressHTML } from "./recent-template-creators";

export const hideRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.add("recent__view-all--hidden");
};

export const showRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.remove("recent__view-all--hidden");
};

export const setFullHeightRecentBlockClass = (recentElm) => {
    recentElm.classList.add("recent--full-height");
};

export const setDeletingFileClass = (recentFileElm) => {
    recentFileElm.classList.add("file--deleting");
};

export const resetDeletingFileClass = (recentFileElm) => {
    recentFileElm.classList.remove("file--deleting");
};

export const disableRecentFileControls = (recentFileElm) => {
    const { fileActionsElm, fileDownloadElm, fileDeleteElm } =
        getRecentFileElms(recentFileElm);

    fileActionsElm.classList.add("file__actions--disabled");
    fileDownloadElm.setAttribute("disabled", true);
    fileDeleteElm.setAttribute("disabled", true);
};

export const enableRecentFileControls = (recentFileElm) => {
    const { fileActionsElm, fileDownloadElm, fileDeleteElm } =
        getRecentFileElms(recentFileElm);

    fileActionsElm.classList.remove("file__actions--disabled");
    fileDownloadElm.removeAttribute("disabled");
    fileDeleteElm.removeAttribute("disabled");
};

export const prepareDownloadProgressElm = (recentFileElm) => {
    const { fileDownloadElm } = getRecentFileElms(recentFileElm);

    fileDownloadElm.parentElement.insertAdjacentHTML(
        "beforeend",
        createFileDownloadProgressHTML()
    );

    const fileProgressElm = getRecentFileProgressElm(recentFileElm);
    const progressLength = 2 * Math.PI * fileProgressElm.r.baseVal.value;

    fileProgressElm.style.strokeDasharray = `${progressLength} ${progressLength}`;
    fileProgressElm.style.strokeDashoffset = progressLength;

    return { fileProgressElm, progressLength };
};

export const updateDownloadProgressElm = (
    fileProgressElm,
    progressLength,
    progressValue
) => {
    fileProgressElm.style.strokeDashoffset =
        progressLength - (progressValue / 100) * progressLength;
};

export const removeDownloadProgressElm = (fileProgressElm) => {
    fileProgressElm.parentElement.remove();
};
