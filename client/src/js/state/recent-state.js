class RecentState {
    isError = false;
    isFullUploadsList = false;
    canFetchMore = false;
    recentFiles = [];
    filesToDelete = [];

    setFullUploadList() {
        this.isFullUploadsList = true;
        this.canFetchMore = false;
    }

    setCanFetchMore() {
        this.canFetchMore = true;
    }

    setRecentFiles(files) {
        this.isError = false;
        this.recentFiles = files;
    }

    addFileToDelete(fileData) {
        this.filesToDelete.push(fileData);
    }

    removeFilesToDelete() {
        this.filesToDelete = [];
    }

    deleteFileFromRecent(fileId) {
        this.recentFiles = this.recentFiles.filter(
            (file) => file._id !== fileId
        );
    }

    setError() {
        this.isError = true;
        this.recentFiles = [];
    }

    resetRecentState() {
        this.isError = false;
        this.isFullUploadsList = false;
        this.canFetchMore = false;
        this.recentFiles = [];
        this.filesToDelete = [];
    }
}

export default new RecentState();
