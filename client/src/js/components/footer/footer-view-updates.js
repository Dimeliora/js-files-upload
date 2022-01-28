export const updateSyncStatus = (syncElm, passedTime) => {
    syncElm.textContent = `Last synced: ${passedTime}`
}