class AppState {
    username = null;
    email = null;
    totalDiskSpace = null;
    usedDiskSpace = null;
    lastSyncTime = null;
    isSyncError = false;

    setSyncError() {
        this.isSyncError = true;
    }

    updateAppData(userData) {
        this.username = userData.username;
        this.email = userData.email;
        this.totalDiskSpace = userData.totalDiskSpace;
        this.usedDiskSpace = userData.usedDiskSpace;
        this.lastSyncTime = Date.now();
        this.isSyncError = false;
    }

    resetAppState() {
        this.username = null;
        this.email = null;
        this.totalDiskSpace = null;
        this.usedDiskSpace = null;
        this.lastSyncTime = null;
        this.isSyncError = false;
    }
}

export default new AppState();
