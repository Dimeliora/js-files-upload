import { getFormattedPassedTime } from '../../helpers/formatters';

export const updateSyncStatusElm = (syncElm, passedTime, isSyncError) => {
    if (isSyncError) {
        syncElm.parentElement.classList.add('footer__sync--error');
        syncElm.textContent = `Sync error: restart app`;
    } else {
        syncElm.parentElement.classList.remove('footer__sync--error');
        syncElm.textContent = `Last synced: ${getFormattedPassedTime(
            new Date(passedTime)
        )}`;
    }
};
