class AppState {
    username = null;
    email = null;
    totalDiskSpace = null;
    usedDiskSpace = null;
    lastSyncTime = null;
    syncError = false;

    setSyncError(errorMessage) {
        this.syncError = errorMessage;
    }

    setInitialAppData(userData) {
        this.username = userData.username;
        this.email = userData.email;
        this.totalDiskSpace = userData.totalDiskSpace;
        this.usedDiskSpace = userData.usedDiskSpace;
        this.lastSyncTime = Date.now();
        this.syncError = null;
    }

    updateAppData(userData) {
        this.usedDiskSpace = userData.usedDiskSpace;
        this.lastSyncTime = Date.now();
        this.syncError = null;
    }

    resetAppState() {
        this.username = null;
        this.email = null;
        this.totalDiskSpace = null;
        this.usedDiskSpace = null;
        this.lastSyncTime = null;
        this.syncError = null;
    }
}

export default new AppState();
