class RecentState {
    isError = false;
    isRecentListActual = false;
    isFullUploadsList = false;
    recentFiles = [];

    setFullUploadList() {
        this.isFullUploadsList = true;
    }

    resetRecentListActualState() {
        this.isRecentListActual = false;
    }

    setRecentFiles(files) {
        this.isError = false;
        this.isRecentListActual = true;
        this.recentFiles = files;
    }

    setError() {
        this.isError = true;
        this.isRecentListActual = false;
        this.recentFiles = [];
    }

    resetRecentState() {
        this.isError = false;
        this.isRecentListActual = false;
        this.isFullUploadsList = false;
        this.recentFiles = [];
    }
}

export default new RecentState();
