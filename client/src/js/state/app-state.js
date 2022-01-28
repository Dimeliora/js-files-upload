class AppState {
    username = null;
    email = null;
    totalDiskSpace = null;
    usedDiskSpace = null;
    lastSyncTime = null;

    updateAppData(userData) {
        this.username = userData.username;
        this.email = userData.email;
        this.totalDiskSpace = userData.totalDiskSpace;
        this.usedDiskSpace = userData.usedDiskSpace;
        this.lastSyncTime = Date.now();
    }
}

export default new AppState();
