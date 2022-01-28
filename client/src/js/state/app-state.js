class AppState {
    isSyncNeeded = true;
    lastSyncDate = null;

    setSyncNeed() {
        this.isSyncNeeded = true;
    }

    setSyncDate() {
        this.isSyncNeeded = false;
        this.lastSyncDate = Date.now();
    }
}

export default new AppState();
