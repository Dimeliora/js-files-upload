class RecentState {
    isError = false;
    isRecentListActual = false;
    isFetching = true;
    totalFilesCount = 0;
    recentFiles = [];

    setFetching() {
        this.isFetching = true;
    }

    resetRecentListActualState() {
        this.isRecentListActual = false;
    }

    setRecentFiles({ total, recent }) {
        this.isError = false;
        this.isFetching = false;
        this.isRecentListActual = true;
        this.totalFilesCount = total;
        this.recentFiles = recent;
    }

    setError() {
        this.isError = true;
        this.isFetching = false;
        this.isRecentListActual = false;
        this.totalFilesCount = 0;
        this.recentFiles = [];
    }

    resetRecentState() {
        this.isError = false;
        this.isRecentListActual = false;
        this.isFetching = true;
        this.totalFilesCount = 0;
        this.recentFiles = [];
    }
}

export default new RecentState();
