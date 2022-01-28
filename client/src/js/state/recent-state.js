class RecentState {
    isError = false;
    totalFilesCount = 0;
    recentFiles = [];

    setRecentFiles({ total, recent }) {
        this.isError = false;
        this.totalFilesCount = total;
        this.recentFiles = recent;
    }

    setError() {
        this.isError = true;
        this.totalFilesCount = 0;
        this.recentFiles = [];
    }
}

export default new RecentState();
