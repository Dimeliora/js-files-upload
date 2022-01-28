export const updateSyncStatus = (syncElm, passedTime, isSyncError) => {
    if (isSyncError) {
        syncElm.classList.add('footer__sync--error');
        syncElm.textContent = `Sync error`;
    } else {
        syncElm.classList.remove('footer__sync--error');
        syncElm.textContent = `Last synced: ${passedTime}`;
    }
};
