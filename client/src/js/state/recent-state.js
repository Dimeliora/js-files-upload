class RecentState {
    isError = false;
    isRecentListActual = false;
    isFullUploadsList = false;
    recentFiles = [];
    filesToDelete = [];

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
