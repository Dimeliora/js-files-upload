class RecentState {
    isError = false;
    hasFiles = false;
    recentFiles = [];

    setRecentFiles(files) {
        this.recentFiles = files;
        this.hasFiles = files.length > 0;
        this.isError = false;
    }

    setError() {
        this.isError = true;
    }
}

export default new RecentState();
