import { getFormattedFileSize } from '../../helpers/formatters';

export const userStorageInfoUpdate = (dashboardElms, total, used) => {
    const { dashboardStorageElm, dashboardProgressElm } = dashboardElms;

    const totalStr = getFormattedFileSize(total);
    const usedStr = getFormattedFileSize(used);
    dashboardStorageElm.textContent = `${usedStr} of ${totalStr}`;

    const ratio = Math.round((used / total) * 100);
    dashboardProgressElm.style.width = `${ratio}%`;

    if (ratio >= 85) {
        dashboardProgressElm.parentElement.classList.add('progress--danger');
    } else if (ratio >= 60) {
        dashboardProgressElm.parentElement.classList.add('progress--warning');
    } else {
        dashboardProgressElm.parentElement.classList.remove(
            'progress--warning'
        );
        dashboardProgressElm.parentElement.classList.remove('progress--danger');
    }
};
