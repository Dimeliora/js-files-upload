class RecentState {
    isError = false;
    isFetching = true;
    totalFilesCount = 0;
    recentFiles = [];

    setFetching() {
        this.isFetching = true;
    }

    setRecentFiles({ total, recent }) {
        this.isError = false;
        this.isFetching = false;
        this.totalFilesCount = total;
        this.recentFiles = recent;
    }

    setError() {
        this.isError = true;
        this.isFetching = false;
        this.totalFilesCount = 0;
        this.recentFiles = [];
    }
}

export default new RecentState();
